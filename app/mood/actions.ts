'use server'

import { createClient } from '@/lib/supabase/server'

// Types
interface FoodPlace {
  id: string
  name: string
  type: string
  location: string
  tags: string[]
  hours: Record<string, string>
}

interface FriendRating {
  place_id: string
  avg_rating: number
  rating_count: number
}

interface MoodRecommendation extends FoodPlace {
  score: number
  friendBonus: boolean
  matchedTags: string[]
}

// Mood to tags mapping
const MOOD_TAG_MAP: Record<string, string[]> = {
  'starving': [
    'all-you-can-eat',
    'buffet',
    'burgers',
    'pizza',
    'american',
    'comfort-food',
    'large-portions'
  ],
  'healthy-cheap': [
    'healthy',
    'vegetarian',
    'vegan',
    'salads',
    'cheap',
    'organic',
    'farm-to-table',
    'fast-food'
  ],
  'comfort': [
    'comfort-food',
    'american',
    'italian',
    'pasta',
    'pizza',
    'homestyle',
    'warm'
  ],
  'new': [
    'indian',
    'asian',
    'japanese',
    'sushi',
    'curry',
    'spicy',
    'exotic',
    'fusion',
    'international'
  ],
  'late-night': [
    'fast-food',
    'quick',
    'grab-and-go',
    'coffee',
    'casual',
    'late-night'
  ],
  'sweet': [
    'desserts',
    'pastries',
    'bakery',
    'coffee',
    'sweet',
    'treats'
  ]
}

/**
 * Get friend ratings for places with rating >= 4
 * Returns places with their average friend rating
 */
async function getFriendHighRatings(userId: string): Promise<Map<string, FriendRating>> {
  const supabase = await createClient()

  // Get all friend IDs
  const { data: friendships, error: friendsError } = await supabase
    .from('friends')
    .select('friend_id')
    .eq('user_id', userId)
    .eq('status', 'accepted')

  if (friendsError || !friendships || friendships.length === 0) {
    return new Map()
  }

  const friendIds = friendships.map(f => f.friend_id)

  // Get friend ratings >= 4
  const { data: ratings, error: ratingsError } = await supabase
    .from('ratings')
    .select('place_id, rating')
    .in('user_id', friendIds)
    .gte('rating', 4)

  if (ratingsError || !ratings) {
    return new Map()
  }

  // Calculate average ratings per place
  const ratingMap = new Map<string, FriendRating>()

  ratings.forEach(r => {
    if (ratingMap.has(r.place_id)) {
      const existing = ratingMap.get(r.place_id)!
      existing.avg_rating = (existing.avg_rating * existing.rating_count + r.rating) / (existing.rating_count + 1)
      existing.rating_count += 1
    } else {
      ratingMap.set(r.place_id, {
        place_id: r.place_id,
        avg_rating: r.rating,
        rating_count: 1,
      })
    }
  })

  return ratingMap
}

/**
 * Get food places matching mood tags
 */
async function getPlacesByMoodTags(moodTags: string[]): Promise<FoodPlace[]> {
  const supabase = await createClient()

  const { data: places, error } = await supabase
    .from('food_places')
    .select('*')

  if (error || !places) {
    console.error('Error fetching places:', error)
    return []
  }

  // Filter places that have at least one matching tag
  const matchingPlaces = places.filter(place => {
    const placeTags = place.tags || []
    return placeTags.some(tag => moodTags.includes(tag))
  })

  return matchingPlaces as FoodPlace[]
}

/**
 * Calculate score for each place based on:
 * 1. Number of matched tags
 * 2. Friend rating bonus (if friends rated it >= 4)
 */
function calculateMoodScore(
  place: FoodPlace,
  moodTags: string[],
  friendRatings: Map<string, FriendRating>
): { score: number; friendBonus: boolean; matchedTags: string[] } {
  const placeTags = place.tags || []

  // Calculate tag matches
  const matchedTags = placeTags.filter(tag => moodTags.includes(tag))
  const tagScore = matchedTags.length / moodTags.length

  // Check friend bonus
  const friendRating = friendRatings.get(place.id)
  const friendBonus = !!friendRating
  const friendScore = friendRating
    ? (friendRating.avg_rating / 5) * 0.5  // Friend ratings contribute up to 50% bonus
    : 0

  const totalScore = tagScore + friendScore

  return {
    score: totalScore,
    friendBonus,
    matchedTags,
  }
}

/**
 * Main function: Get mood-based recommendations
 * Returns top 5 places sorted by score
 */
export async function getMoodRecommendations(
  mood: string,
  userId: string
): Promise<MoodRecommendation[]> {
  // Get mood tags
  const moodTags = MOOD_TAG_MAP[mood]
  if (!moodTags) {
    console.error('Invalid mood:', mood)
    return []
  }

  // Fetch data in parallel
  const [places, friendRatings] = await Promise.all([
    getPlacesByMoodTags(moodTags),
    getFriendHighRatings(userId),
  ])

  // Score each place
  const scoredPlaces: MoodRecommendation[] = places.map(place => {
    const { score, friendBonus, matchedTags } = calculateMoodScore(
      place,
      moodTags,
      friendRatings
    )

    return {
      ...place,
      score,
      friendBonus,
      matchedTags,
    }
  })

  // Sort by score (highest first) and return top 5
  scoredPlaces.sort((a, b) => b.score - a.score)

  return scoredPlaces.slice(0, 5)
}

/**
 * Get all available moods with their tag counts
 * Useful for understanding what each mood looks for
 */
export async function getMoodInfo() {
  return Object.entries(MOOD_TAG_MAP).map(([mood, tags]) => ({
    mood,
    tagCount: tags.length,
    tags: tags.slice(0, 5), // Show first 5 tags as preview
  }))
}
