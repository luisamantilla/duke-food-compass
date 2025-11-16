import { SupabaseClient } from '@supabase/supabase-js';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface UserPreferences {
  user_id: string;
  dietary: string[];
  budget: number;
  dislikes: string[];
  favorite_tags: string[];
}

export interface FoodPlace {
  id: string;
  name: string;
  type: string;
  location: string;
  tags: string[];
  hours: Record<string, string>;
}

export interface Rating {
  id: string;
  user_id: string;
  place_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  food_places?: FoodPlace;
}

export interface Special {
  id: string;
  place_id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  tags: string[];
  food_places?: FoodPlace;
}

export interface RecommendationScore {
  place: FoodPlace;
  score: number;
  reasons: string[];
  special?: Special;
}

export interface Recommendation {
  place: FoodPlace;
  primaryReason: string;
  score: number;
  special?: Special;
}

// ============================================
// CONFIGURATION
// ============================================

const WEIGHTS = {
  userRatingHistory: 0.30,      // 30% - Past preferences
  tagMatch: 0.25,                // 25% - Tag alignment
  friendRatings: 0.20,           // 20% - Social signals
  dailySpecials: 0.15,           // 15% - Current deals
  budget: 0.10,                  // 10% - Price considerations
};

const DIETARY_TAGS_MAP: Record<string, string[]> = {
  'vegetarian': ['vegetarian', 'vegan', 'healthy', 'salads'],
  'vegan': ['vegan', 'healthy', 'organic'],
  'gluten-free': ['gluten-free', 'healthy'],
  'halal': ['halal'],
  'pescatarian': ['sushi', 'japanese', 'healthy'],
};

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

/**
 * Fetch user preferences including dietary restrictions and favorite tags
 */
async function getUserPreferences(
  supabase: SupabaseClient,
  userId: string
): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from('preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    console.error('Error fetching user preferences:', error);
    return null;
  }

  return {
    user_id: data.user_id,
    dietary: data.dietary || [],
    budget: data.budget || 20,
    dislikes: data.dislikes || [],
    favorite_tags: data.favorite_tags || [],
  };
}

/**
 * Fetch user's past 10 ratings with place details
 */
async function getUserRatingHistory(
  supabase: SupabaseClient,
  userId: string
): Promise<Rating[]> {
  const { data, error } = await supabase
    .from('ratings')
    .select(`
      *,
      food_places (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error || !data) {
    console.error('Error fetching user ratings:', error);
    return [];
  }

  return data as Rating[];
}

/**
 * Fetch all food places
 */
async function getAllFoodPlaces(
  supabase: SupabaseClient
): Promise<FoodPlace[]> {
  const { data, error } = await supabase
    .from('food_places')
    .select('*');

  if (error || !data) {
    console.error('Error fetching food places:', error);
    return [];
  }

  return data as FoodPlace[];
}

/**
 * Fetch today's specials with place details
 */
async function getTodaysSpecials(
  supabase: SupabaseClient
): Promise<Special[]> {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('specials')
    .select(`
      *,
      food_places (*)
    `)
    .eq('date', today);

  if (error || !data) {
    console.error('Error fetching specials:', error);
    return [];
  }

  return data as Special[];
}

/**
 * Fetch friends' highly rated places from the past week
 * Note: This assumes you have a friends relationship table.
 * For now, we'll get all users' ratings except the current user.
 */
async function getFriendsHighRatings(
  supabase: SupabaseClient,
  userId: string
): Promise<Rating[]> {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('ratings')
    .select(`
      *,
      food_places (*)
    `)
    .neq('user_id', userId)
    .gte('rating', 4)
    .gte('created_at', oneWeekAgo.toISOString());

  if (error || !data) {
    console.error('Error fetching friends ratings:', error);
    return [];
  }

  return data as Rating[];
}

// ============================================
// SCORING FUNCTIONS
// ============================================

/**
 * Calculate score based on user's past ratings
 */
function calculateRatingHistoryScore(
  place: FoodPlace,
  userRatings: Rating[]
): { score: number; topRatedPlace?: string; similarity: number } {
  if (userRatings.length === 0) {
    return { score: 0, similarity: 0 };
  }

  let totalScore = 0;
  let maxSimilarity = 0;
  let topRatedPlace: string | undefined;

  for (const rating of userRatings) {
    if (!rating.food_places) continue;

    // Calculate tag similarity
    const ratedPlaceTags = rating.food_places.tags || [];
    const currentPlaceTags = place.tags || [];

    const commonTags = ratedPlaceTags.filter(tag =>
      currentPlaceTags.includes(tag)
    );

    const similarity = commonTags.length / Math.max(currentPlaceTags.length, 1);

    // Weight by the rating value (1-5) and recency
    const ratingWeight = rating.rating / 5;
    const tagScore = similarity * ratingWeight;

    totalScore += tagScore;

    if (similarity > maxSimilarity && rating.rating >= 4) {
      maxSimilarity = similarity;
      topRatedPlace = rating.food_places.name;
    }
  }

  const averageScore = totalScore / userRatings.length;

  return {
    score: averageScore,
    topRatedPlace,
    similarity: maxSimilarity,
  };
}

/**
 * Calculate score based on tag matching with preferences
 */
function calculateTagMatchScore(
  place: FoodPlace,
  preferences: UserPreferences
): { score: number; matchedTags: string[] } {
  const placeTags = place.tags || [];
  const favoriteTags = preferences.favorite_tags || [];
  const dietary = preferences.dietary || [];
  const dislikes = preferences.dislikes || [];

  // Hard filter: Check dietary requirements
  const dietaryTags = dietary.flatMap(diet => DIETARY_TAGS_MAP[diet] || [diet]);
  const hasDietaryConflict = placeTags.some(tag =>
    dislikes.includes(tag)
  );

  if (hasDietaryConflict) {
    return { score: 0, matchedTags: [] };
  }

  // Calculate favorite tag matches
  const matchedFavoriteTags = placeTags.filter(tag =>
    favoriteTags.includes(tag)
  );

  // Calculate dietary alignment
  const matchedDietaryTags = placeTags.filter(tag =>
    dietaryTags.includes(tag)
  );

  const allMatched = [...matchedFavoriteTags, ...matchedDietaryTags];
  const uniqueMatched = [...new Set(allMatched)];

  // Score is ratio of matched tags
  const score = uniqueMatched.length / Math.max(favoriteTags.length + dietaryTags.length, 1);

  return {
    score: Math.min(score, 1), // Cap at 1.0
    matchedTags: uniqueMatched,
  };
}

/**
 * Calculate score based on friends' ratings
 */
function calculateFriendsScore(
  place: FoodPlace,
  friendsRatings: Rating[]
): { score: number; friendCount: number; avgRating: number } {
  const placeRatings = friendsRatings.filter(r => r.place_id === place.id);

  if (placeRatings.length === 0) {
    return { score: 0, friendCount: 0, avgRating: 0 };
  }

  const avgRating = placeRatings.reduce((sum, r) => sum + r.rating, 0) / placeRatings.length;
  const friendCount = placeRatings.length;

  // Normalize to 0-1, with bonus for multiple friends
  const score = (avgRating / 5) * Math.min(1 + (friendCount * 0.1), 1.5);

  return {
    score: Math.min(score, 1),
    friendCount,
    avgRating,
  };
}

/**
 * Calculate score based on daily specials
 */
function calculateSpecialsScore(
  place: FoodPlace,
  specials: Special[],
  budget: number
): { score: number; special?: Special } {
  const placeSpecial = specials.find(s => s.place_id === place.id);

  if (!placeSpecial) {
    return { score: 0 };
  }

  // Score higher if price is within budget
  const priceScore = placeSpecial.price <= budget ? 1 : 0.5;

  // Bonus for good deals
  const discountBonus = placeSpecial.tags?.includes('discount') ? 0.2 : 0;

  const score = Math.min(priceScore + discountBonus, 1);

  return {
    score,
    special: placeSpecial,
  };
}

/**
 * Calculate budget compatibility score
 */
function calculateBudgetScore(
  place: FoodPlace,
  budget: number
): number {
  // Estimate average price based on place type and tags
  const tags = place.tags || [];

  let estimatedPrice = 10; // default

  if (tags.includes('fine-dining') || tags.includes('upscale')) {
    estimatedPrice = 20;
  } else if (tags.includes('cheap') || tags.includes('fast-food')) {
    estimatedPrice = 7;
  } else if (place.type === 'dining hall') {
    estimatedPrice = 12;
  }

  // Score based on how well it fits budget
  if (estimatedPrice <= budget) {
    return 1;
  } else if (estimatedPrice <= budget * 1.2) {
    return 0.7;
  } else {
    return 0.3;
  }
}

// ============================================
// REASON GENERATION
// ============================================

/**
 * Generate personalized recommendation reasons
 */
function generateReasons(
  place: FoodPlace,
  scoreDetails: {
    ratingHistory: { score: number; topRatedPlace?: string; similarity: number };
    tagMatch: { score: number; matchedTags: string[] };
    friends: { score: number; friendCount: number; avgRating: number };
    specials: { score: number; special?: Special };
    budget: number;
  },
  preferences: UserPreferences
): string[] {
  const reasons: string[] = [];

  // Rating history reason
  if (scoreDetails.ratingHistory.score > 0.3 && scoreDetails.ratingHistory.topRatedPlace) {
    reasons.push(
      `Similar to ${scoreDetails.ratingHistory.topRatedPlace}, which you loved`
    );
  }

  // Tag match reasons
  if (scoreDetails.tagMatch.matchedTags.length > 0) {
    const topTags = scoreDetails.tagMatch.matchedTags.slice(0, 3);
    if (topTags.some(tag => preferences.dietary.includes(tag))) {
      reasons.push(`Matches your dietary preferences (${topTags.join(', ')})`);
    } else {
      reasons.push(`Matches your taste: ${topTags.join(', ')}`);
    }
  }

  // Friends reason
  if (scoreDetails.friends.friendCount > 0) {
    const friendText = scoreDetails.friends.friendCount === 1 ? 'friend' : 'friends';
    reasons.push(
      `${scoreDetails.friends.friendCount} ${friendText} rated this highly this week (${scoreDetails.friends.avgRating.toFixed(1)}/5)`
    );
  }

  // Special reason
  if (scoreDetails.specials.special) {
    reasons.push(
      `Today's special: ${scoreDetails.specials.special.title} ($${scoreDetails.specials.special.price})`
    );
  }

  // Budget reason
  if (scoreDetails.budget >= 0.8) {
    reasons.push(`Fits your budget perfectly`);
  }

  // Default reason if no specific reasons
  if (reasons.length === 0) {
    reasons.push(`Popular choice on campus`);
  }

  return reasons;
}

/**
 * Select the primary (most compelling) reason
 */
function selectPrimaryReason(reasons: string[]): string {
  // Priority order: rating history > friends > specials > tags > budget
  const priorityKeywords = [
    'loved',
    'friends rated',
    'special',
    'dietary',
    'taste',
    'budget',
  ];

  for (const keyword of priorityKeywords) {
    const reason = reasons.find(r => r.toLowerCase().includes(keyword));
    if (reason) return reason;
  }

  return reasons[0] || 'Recommended for you';
}

// ============================================
// MAIN RECOMMENDATION ENGINE
// ============================================

/**
 * Generate personalized food recommendations for a user
 *
 * @param supabase - Supabase client instance
 * @param userId - User ID to generate recommendations for
 * @param limit - Number of recommendations to return (default: 7)
 * @returns Array of recommended places with reasons
 */
export async function getRecommendations(
  supabase: SupabaseClient,
  userId: string,
  limit: number = 7
): Promise<Recommendation[]> {
  // Fetch all required data in parallel
  const [
    preferences,
    userRatings,
    allPlaces,
    todaysSpecials,
    friendsRatings,
  ] = await Promise.all([
    getUserPreferences(supabase, userId),
    getUserRatingHistory(supabase, userId),
    getAllFoodPlaces(supabase),
    getTodaysSpecials(supabase),
    getFriendsHighRatings(supabase, userId),
  ]);

  if (!preferences) {
    throw new Error('User preferences not found');
  }

  // Calculate scores for each place
  const scoredPlaces: RecommendationScore[] = allPlaces.map(place => {
    // Calculate individual component scores
    const ratingHistory = calculateRatingHistoryScore(place, userRatings);
    const tagMatch = calculateTagMatchScore(place, preferences);
    const friends = calculateFriendsScore(place, friendsRatings);
    const specials = calculateSpecialsScore(place, todaysSpecials, preferences.budget);
    const budget = calculateBudgetScore(place, preferences.budget);

    // Skip if dietary conflict
    if (tagMatch.score === 0 && preferences.dietary.length > 0) {
      return null;
    }

    // Calculate weighted total score
    const totalScore =
      ratingHistory.score * WEIGHTS.userRatingHistory +
      tagMatch.score * WEIGHTS.tagMatch +
      friends.score * WEIGHTS.friendRatings +
      specials.score * WEIGHTS.dailySpecials +
      budget * WEIGHTS.budget;

    // Generate reasons
    const reasons = generateReasons(
      place,
      { ratingHistory, tagMatch, friends, specials, budget },
      preferences
    );

    return {
      place,
      score: totalScore,
      reasons,
      special: specials.special,
    };
  }).filter((item): item is RecommendationScore => item !== null);

  // Sort by score and take top N
  scoredPlaces.sort((a, b) => b.score - a.score);
  const topRecommendations = scoredPlaces.slice(0, limit);

  // Format final recommendations
  return topRecommendations.map(rec => ({
    place: rec.place,
    primaryReason: selectPrimaryReason(rec.reasons),
    score: rec.score,
    special: rec.special,
  }));
}

/**
 * Get recommendations with full details including all reasons
 * Useful for debugging or showing multiple reasons to users
 */
export async function getDetailedRecommendations(
  supabase: SupabaseClient,
  userId: string,
  limit: number = 7
): Promise<RecommendationScore[]> {
  const [
    preferences,
    userRatings,
    allPlaces,
    todaysSpecials,
    friendsRatings,
  ] = await Promise.all([
    getUserPreferences(supabase, userId),
    getUserRatingHistory(supabase, userId),
    getAllFoodPlaces(supabase),
    getTodaysSpecials(supabase),
    getFriendsHighRatings(supabase, userId),
  ]);

  if (!preferences) {
    throw new Error('User preferences not found');
  }

  const scoredPlaces: RecommendationScore[] = allPlaces.map(place => {
    const ratingHistory = calculateRatingHistoryScore(place, userRatings);
    const tagMatch = calculateTagMatchScore(place, preferences);
    const friends = calculateFriendsScore(place, friendsRatings);
    const specials = calculateSpecialsScore(place, todaysSpecials, preferences.budget);
    const budget = calculateBudgetScore(place, preferences.budget);

    if (tagMatch.score === 0 && preferences.dietary.length > 0) {
      return null;
    }

    const totalScore =
      ratingHistory.score * WEIGHTS.userRatingHistory +
      tagMatch.score * WEIGHTS.tagMatch +
      friends.score * WEIGHTS.friendRatings +
      specials.score * WEIGHTS.dailySpecials +
      budget * WEIGHTS.budget;

    const reasons = generateReasons(
      place,
      { ratingHistory, tagMatch, friends, specials, budget },
      preferences
    );

    return {
      place,
      score: totalScore,
      reasons,
      special: specials.special,
    };
  }).filter((item): item is RecommendationScore => item !== null);

  scoredPlaces.sort((a, b) => b.score - a.score);
  return scoredPlaces.slice(0, limit);
}
