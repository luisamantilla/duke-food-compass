# Mood-Based Dining - Usage Guide

## Overview

The Mood-Based Dining page allows users to get food recommendations based on their current mood. It uses tag matching and friend ratings to provide personalized suggestions.

## Features

### 🎭 Six Mood Options

1. **I'm starving** 🍕 - Big portions, filling meals
2. **Healthy & cheap** 🥗 - Fresh & affordable options
3. **Comfort food** 🍜 - Cozy & familiar favorites
4. **Try something new** 🌶️ - Adventure and exotic cuisines
5. **Late night** 🌙 - Open late, quick bites
6. **Sweet cravings** 🍰 - Desserts & treats

### 🎯 Smart Matching Algorithm

**Scoring System:**
```typescript
Total Score = Tag Match Score + Friend Rating Bonus

Tag Match Score = (Matched Tags / Total Mood Tags)
Friend Bonus = (Avg Friend Rating / 5) × 0.5  // Up to 50% bonus
```

**Example:**
```
Mood: "I'm starving"
Tags: ['all-you-can-eat', 'buffet', 'burgers', 'pizza', 'american']

Place: Marketplace
- Tags: ['buffet', 'all-you-can-eat', 'vegetarian']
- Matched: 2/5 tags = 0.4 (40%)
- Friends rated: 4.5/5 stars
- Friend bonus: (4.5/5) × 0.5 = 0.45 (45%)
- Total score: 0.4 + 0.45 = 0.85 (85% match)
```

### ✨ Key Features

- ✅ **Tag-based matching** - Places scored by how many mood tags they match
- ✅ **Friend rating boost** - Bonus points if friends rated it ≥4 stars
- ✅ **Top 5 results** - Best matches sorted by score
- ✅ **Real-time stats** - Shows friend favorites and average match score
- ✅ **Instant feedback** - Loading states and smooth transitions

## File Structure

```
app/mood/
├── page.tsx                # Server component (layout)
├── MoodSelectorClient.tsx  # Client component (interactivity)
├── actions.ts              # Server actions (queries)
└── README.md               # This documentation

components/
├── MoodSelector.tsx        # Mood button grid
└── MoodResultCard.tsx      # Result display card
```

## Architecture

### Server Component Pattern

```
page.tsx (Server)
    │
    └─> MoodSelectorClient.tsx (Client)
            │
            ├─> MoodSelector.tsx (Client)
            │
            └─> Server Action: getMoodRecommendations()
                    │
                    ├─> getPlacesByMoodTags()
                    │
                    └─> getFriendHighRatings()
```

## Mood to Tags Mapping

### "I'm starving"
```typescript
['all-you-can-eat', 'buffet', 'burgers', 'pizza', 'american', 'comfort-food', 'large-portions']
```

### "Healthy & cheap"
```typescript
['healthy', 'vegetarian', 'vegan', 'salads', 'cheap', 'organic', 'farm-to-table', 'fast-food']
```

### "Comfort food"
```typescript
['comfort-food', 'american', 'italian', 'pasta', 'pizza', 'homestyle', 'warm']
```

### "Try something new"
```typescript
['indian', 'asian', 'japanese', 'sushi', 'curry', 'spicy', 'exotic', 'fusion', 'international']
```

### "Late night"
```typescript
['fast-food', 'quick', 'grab-and-go', 'coffee', 'casual', 'late-night']
```

### "Sweet cravings"
```typescript
['desserts', 'pastries', 'bakery', 'coffee', 'sweet', 'treats']
```

## Supabase Queries

### 1. Get Friend High Ratings

**Purpose:** Find which places friends rated ≥4 stars

```typescript
// Step 1: Get friend IDs
const { data: friendships } = await supabase
  .from('friends')
  .select('friend_id')
  .eq('user_id', userId)
  .eq('status', 'accepted')

// Step 2: Get their high ratings
const { data: ratings } = await supabase
  .from('ratings')
  .select('place_id, rating')
  .in('user_id', friendIds)
  .gte('rating', 4)
```

**Returns:** Map of place_id → { avg_rating, rating_count }

### 2. Get Places by Mood Tags

**Purpose:** Find all places with matching tags

```typescript
const { data: places } = await supabase
  .from('food_places')
  .select('*')

// Filter in-memory for tag matches
const matchingPlaces = places.filter(place => {
  return place.tags.some(tag => moodTags.includes(tag))
})
```

**Returns:** Array of FoodPlace objects with matching tags

### 3. Calculate Scores

```typescript
function calculateMoodScore(place, moodTags, friendRatings) {
  // Tag matching
  const matchedTags = place.tags.filter(tag => moodTags.includes(tag))
  const tagScore = matchedTags.length / moodTags.length

  // Friend bonus
  const friendRating = friendRatings.get(place.id)
  const friendScore = friendRating
    ? (friendRating.avg_rating / 5) * 0.5
    : 0

  return {
    score: tagScore + friendScore,
    friendBonus: !!friendRating,
    matchedTags
  }
}
```

## Components

### MoodSelector

**Props:**
```typescript
{
  onMoodSelect?: (moodId: string) => void,
  selectedMood?: string
}
```

**Features:**
- 2×3 grid (mobile: 2 columns, desktop: 3 columns)
- Emoji + label + description for each mood
- Selected state with blue border
- Confirmation message when selected

### MoodResultCard

**Props:**
```typescript
{
  recommendation: MoodRecommendation,
  rank: number  // 1-5
}
```

**Displays:**
- Rank badge (#1, #2, etc.)
- Place name and type
- Match percentage score
- Location
- Matched tags (why it matches)
- Friend bonus indicator
- "View Details" CTA button

**Variants:**
- `MoodResultCard` - Full card with all details
- `MoodResultCardCompact` - Horizontal compact version

## Usage Flow

1. **User selects mood** → MoodSelector updates state
2. **Clicks "Get Recommendations"** → Triggers server action
3. **Server action runs:**
   - Fetches friend ratings ≥4
   - Fetches places with matching tags
   - Scores each place (tag match + friend bonus)
   - Sorts by score and returns top 5
4. **Results display** → Shows ranked cards with stats

## Customization

### Adding New Moods

Edit `/app/mood/actions.ts`:

```typescript
const MOOD_TAG_MAP: Record<string, string[]> = {
  // ... existing moods
  'quick-bite': ['fast-food', 'quick', 'grab-and-go', 'casual'],
}
```

Edit `/components/MoodSelector.tsx`:

```typescript
const moods: Mood[] = [
  // ... existing moods
  { id: 'quick-bite', emoji: '⚡', label: 'Quick bite', description: 'Fast & easy' },
]
```

### Adjusting Friend Bonus Weight

Edit `/app/mood/actions.ts` line ~150:

```typescript
// Current: 50% maximum bonus
const friendScore = friendRating
  ? (friendRating.avg_rating / 5) * 0.5
  : 0

// Increase to 75% bonus
const friendScore = friendRating
  ? (friendRating.avg_rating / 5) * 0.75
  : 0
```

### Changing Result Limit

Edit `/app/mood/actions.ts` line ~189:

```typescript
// Current: Top 5
return scoredPlaces.slice(0, 5)

// Change to top 10
return scoredPlaces.slice(0, 10)
```

## Example Scenarios

### Scenario 1: Starving Student

**Mood:** "I'm starving"
**Matches:**
1. Marketplace (buffet, all-you-can-eat) - 85%
2. Twinnies (buffet, all-you-can-eat) - 82%
3. Il Forno (pizza, comfort-food) - 70%

### Scenario 2: Healthy Budget Eater

**Mood:** "Healthy & cheap"
**Matches:**
1. Farmstead (healthy, organic, farm-to-table) + Friends ❤️ - 92%
2. Marketplace (vegetarian, vegan, healthy) - 75%
3. The Skillet (healthy, cheap) - 68%

### Scenario 3: Adventure Seeker

**Mood:** "Try something new"
**Matches:**
1. Tandoor (indian, curry, spicy) + Friends ❤️ - 88%
2. The Gyotaku (japanese, sushi, asian) - 82%
3. Ginger + Soy (asian, fusion) - 75%

## Performance

- **Query optimization**: Parallel fetching of places and friend ratings
- **Client-side filtering**: Tag matching done in-memory for speed
- **Database indexes**: Fast lookups on user_id, friend_id, place_id
- **Result limit**: Only top 5 returned to minimize data transfer

## Testing

### With Seed Data

1. Run updated schema with Duke food places
2. Ensure places have appropriate tags
3. Create friend relationships
4. Add friend ratings ≥4 for some places
5. Navigate to `/mood` and select a mood

### Testing Different Moods

```sql
-- Add tags to test places
UPDATE food_places
SET tags = tags || '["late-night", "quick"]'::jsonb
WHERE name = 'McDonald''s @ WU';

-- Add friend high ratings
INSERT INTO ratings (user_id, place_id, rating, comment)
SELECT
  (SELECT id FROM users WHERE email = 'friend@duke.edu'),
  (SELECT id FROM food_places WHERE name = 'Tandoor'),
  5,
  'Amazing for trying something new!';
```

## Troubleshooting

**No results showing:**
- Check if food_places have tags matching the mood
- Verify tags are in JSONB array format
- Check Supabase connection

**Friend bonus not working:**
- Ensure friends table has accepted friendships
- Verify friend ratings exist with rating ≥4
- Check user_id is correct

**Low match scores:**
- Add more relevant tags to food_places
- Adjust scoring weights in actions.ts
- Review MOOD_TAG_MAP for better tag selection

## Future Enhancements

- [ ] Time-based filtering (breakfast, lunch, dinner moods)
- [ ] Distance/location filtering
- [ ] Save favorite moods
- [ ] Mood history tracking
- [ ] Share mood results with friends
- [ ] Custom mood creation
- [ ] Real-time availability checking
- [ ] Push notifications for mood-matched specials

## Related Files

- `/lib/recommender.ts` - Main recommendation engine
- `/app/specials/page.tsx` - Similar relevance scoring
- `/app/friends/page.tsx` - Friend ratings source
- `/components/MoodSelector.tsx` - Mood selection UI
