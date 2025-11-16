# Duke Food Compass Recommendation Engine

A sophisticated, multi-signal recommendation system that provides personalized dining suggestions for Duke students.

## Features

### 🎯 Multi-Signal Scoring System

The recommendation engine combines 5 weighted signals to generate personalized recommendations:

| Signal | Weight | Description |
|--------|--------|-------------|
| **User Rating History** | 30% | Analyzes past 10 ratings to find similar places |
| **Tag Matching** | 25% | Matches dietary restrictions and favorite tags |
| **Friend Ratings** | 20% | Considers what friends rated highly this week |
| **Daily Specials** | 15% | Boosts places with deals and promotions |
| **Budget** | 10% | Ensures recommendations fit price preferences |

### 🧠 Smart Features

- **Dietary Filtering**: Hard filters for dietary restrictions (vegetarian, vegan, gluten-free, halal)
- **Similarity Matching**: Finds places similar to your highly-rated favorites
- **Social Signals**: Leverages friends' recent ratings (≥4 stars)
- **Deal Detection**: Prioritizes current specials within your budget
- **Personalized Reasons**: Generates contextual explanations like:
  - "Similar to Farmstead, which you loved"
  - "3 friends rated this highly this week (4.7/5)"
  - "Today's special: Taco Tuesday Special ($6.99)"
  - "Matches your dietary preferences (vegetarian, healthy)"

## Usage

### Basic Usage

```typescript
import { createClient } from '@supabase/supabase-js';
import { getRecommendations } from './lib/recommender';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const recommendations = await getRecommendations(supabase, userId);

// Returns top 7 recommendations with primary reason
recommendations.forEach(rec => {
  console.log(`${rec.place.name}: ${rec.primaryReason}`);
});
```

### Detailed Recommendations

```typescript
import { getDetailedRecommendations } from './lib/recommender';

const detailed = await getDetailedRecommendations(supabase, userId, 5);

// Returns all reasons and full scoring details
detailed.forEach(rec => {
  console.log(`${rec.place.name}`);
  rec.reasons.forEach(reason => {
    console.log(`  • ${reason}`);
  });
});
```

## API Reference

### `getRecommendations(supabase, userId, limit?)`

Generates personalized recommendations with a single primary reason.

**Parameters:**
- `supabase`: SupabaseClient - Initialized Supabase client
- `userId`: string - User ID to generate recommendations for
- `limit`: number - Number of recommendations (default: 7)

**Returns:** `Promise<Recommendation[]>`

```typescript
interface Recommendation {
  place: FoodPlace;
  primaryReason: string;
  score: number;
  special?: Special;
}
```

### `getDetailedRecommendations(supabase, userId, limit?)`

Generates recommendations with all reasons and detailed scoring.

**Returns:** `Promise<RecommendationScore[]>`

```typescript
interface RecommendationScore {
  place: FoodPlace;
  score: number;
  reasons: string[];
  special?: Special;
}
```

## Algorithm Details

### 1. Rating History Score (30%)

```typescript
// Calculates similarity between place tags and your highly-rated places
// Higher weight for recent ratings and higher scores (4-5 stars)
const similarity = commonTags.length / maxPossibleTags;
const score = similarity * (rating / 5);
```

### 2. Tag Match Score (25%)

```typescript
// Matches favorite tags and dietary requirements
// Hard filter: Excludes places with disliked ingredients
const matchedTags = placeTags.filter(tag =>
  favoriteTags.includes(tag) || dietaryTags.includes(tag)
);
```

### 3. Friends Score (20%)

```typescript
// Average of friends' ratings from past week (≥4 stars only)
// Bonus multiplier for multiple friends (up to 1.5x)
const score = (avgRating / 5) * min(1 + (friendCount * 0.1), 1.5);
```

### 4. Specials Score (15%)

```typescript
// Boosts places with today's specials
// Higher score if price is within budget
// Bonus for discount tags
const score = priceWithinBudget ? 1.0 : 0.5;
```

### 5. Budget Score (10%)

```typescript
// Estimates price based on place type and tags
// Fine-dining: ~$20, Fast-food: ~$7, Dining halls: ~$12
// Scores higher if estimated price ≤ budget
```

## Customization

### Adjusting Weights

Edit the `WEIGHTS` object in `recommender.ts`:

```typescript
const WEIGHTS = {
  userRatingHistory: 0.30,  // Increase for more personalization
  tagMatch: 0.25,           // Increase for stricter preference matching
  friendRatings: 0.20,      // Increase for more social influence
  dailySpecials: 0.15,      // Increase to prioritize deals
  budget: 0.10,             // Increase for stricter budget adherence
};
```

### Adding Custom Dietary Tags

```typescript
const DIETARY_TAGS_MAP: Record<string, string[]> = {
  'vegetarian': ['vegetarian', 'vegan', 'healthy', 'salads'],
  'keto': ['low-carb', 'protein', 'healthy'],
  // Add more mappings
};
```

## Examples

See `recommender-example.ts` for complete examples including:

- Next.js API routes
- React components
- Server actions
- CLI usage

## Requirements

- Supabase database with schema from `schema.sql`
- User preferences configured in `preferences` table
- At least a few user ratings for personalized recommendations

## Performance

- All data fetching runs in parallel using `Promise.all()`
- Efficient tag matching with Set operations
- Indexes on foreign keys for fast queries
- Scales well with 100s of food places and 1000s of ratings

## Future Enhancements

- [ ] Time-based recommendations (breakfast vs dinner)
- [ ] Location-based proximity scoring
- [ ] Collaborative filtering (users with similar taste)
- [ ] Machine learning for weight optimization
- [ ] A/B testing framework for algorithm improvements
