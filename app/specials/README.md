# Specials Page - Usage Guide

## Overview

The Specials page is a **Next.js server component** that fetches today's special offers from Supabase, sorts them by relevance to user preferences, and displays them with personalized UI elements.

## Features

### ✅ Server-Side Rendering
- Fetches data at build/request time for better SEO and performance
- No client-side loading states needed
- Data is fresh on each page load

### 🎯 Personalized Relevance Scoring

The page calculates a relevance score (0-1) for each special based on:

| Factor | Weight | Description |
|--------|--------|-------------|
| **Favorite Tags** | 40% | Matches user's preferred cuisines/styles |
| **Dietary Match** | 30% | Aligns with dietary restrictions |
| **Budget** | 20% | Within user's budget (+10% bonus for great deals) |
| **Discount Tags** | 10% | Has "discount" or "combo" tags |

### 🚫 Smart Filtering
- Automatically penalizes specials with disliked ingredients
- Prioritizes specials within budget
- Sorts by relevance, then by price

### 🎨 Dynamic UI Elements

**"Perfect Match" Badge**
- Shown when relevance score > 0.7
- Highlights top recommendations

**Matched Tags**
- Green checkmarks on tags that match preferences
- Shows which tags matched in a banner

**Stats Banners**
- "Perfect Matches" - Shown when high-relevance specials exist
- "Budget Friendly" - Shows count of specials within budget

### 📭 Empty State
When no specials are available:
- Clear message: "No new specials today. Check again later."
- CTA buttons to recommendations and home page
- Clean, centered layout

## File Structure

```
app/specials/
├── page.tsx           # Server component (this file)
└── README.md          # This documentation

components/
└── SpecialCard.tsx    # Card component with two variants
```

## Usage

### Basic Setup

The page automatically runs as a server component. Just navigate to `/specials`.

### Getting User ID

Currently uses a placeholder. Replace line 177 with actual auth:

```typescript
// Current (placeholder)
const userId = 'user-id-from-session' // TODO: Get from auth session

// With Supabase Auth
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

const cookieStore = await cookies()
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  }
)

const { data: { user } } = await supabase.auth.getUser()
const userId = user?.id || null
```

### Customizing Relevance Weights

Edit the `calculateRelevanceScore` function (lines 83-144):

```typescript
// Dietary match (30% weight)
if (dietaryMatch.length > 0) {
  score += 0.3 * Math.min(dietaryMatch.length / dietaryTags.length, 1)
  matchedTags.push(...dietaryMatch)
}

// Favorite tags match (40% weight) - ADJUST HERE
if (favoriteMatch.length > 0) {
  score += 0.4 * Math.min(favoriteMatch.length / Math.max(favoriteTags.length, 1), 1)
  matchedTags.push(...favoriteMatch)
}
```

## Components

### SpecialCard (Default)

Full-featured card with:
- Gradient banner with price
- "Perfect Match" badge
- Matched tags highlighting
- Place information
- CTA button

```tsx
<SpecialCard
  special={special}
  relevanceScore={0.85}
  matchedTags={['vegetarian', 'healthy']}
/>
```

### SpecialCardCompact

Compact horizontal layout for lists:

```tsx
import { SpecialCardCompact } from '@/components/SpecialCard'

<SpecialCardCompact
  special={special}
  matchedTags={['vegan', 'cheap']}
/>
```

## Scoring Algorithm Example

**User Preferences:**
```json
{
  "dietary": ["vegetarian"],
  "favorite_tags": ["healthy", "organic"],
  "dislikes": ["spicy"],
  "budget": 15
}
```

**Special:**
```json
{
  "title": "Farm Bowl Special",
  "price": 9.99,
  "tags": ["vegetarian", "healthy", "organic"],
  "food_places": {
    "tags": ["farm-to-table", "salads"]
  }
}
```

**Score Calculation:**
```
Dietary match:    0.30 (vegetarian found)
Favorite match:   0.40 (healthy + organic = 2/2 tags)
Budget match:     0.30 (under budget + great deal bonus)
Discount bonus:   0.00 (no discount tag)
─────────────────────
Total Score:      1.00 (Perfect Match!)
```

## API Reference

### `getTodaysSpecials()`
Fetches today's specials with food place details.

**Returns:** `Promise<Special[]>`

### `getUserPreferences(userId: string)`
Fetches user preferences from database.

**Returns:** `Promise<UserPreferences | null>`

### `calculateRelevanceScore(special, preferences)`
Calculates relevance score and matched tags.

**Returns:** `{ score: number; matchedTags: string[] }`

### `sortSpecialsByRelevance(specials, preferences)`
Sorts specials by relevance, then price.

**Returns:** `ScoredSpecial[]`

## Styling

Uses Tailwind CSS with:
- Gradient backgrounds (amber/orange theme)
- Responsive grid layout (1 col mobile, 2 cols desktop)
- Smooth hover effects
- Lucide React icons

## Performance

- Server-side rendering (no client JS needed for data)
- Single database query for specials
- Single query for user preferences
- Efficient scoring algorithm (O(n × m) where n = specials, m = tags)

## Future Enhancements

- [ ] Cache user preferences for faster loads
- [ ] Add filtering by cuisine type
- [ ] Real-time updates with Supabase subscriptions
- [ ] Save favorite specials
- [ ] Share specials with friends
- [ ] Push notifications for new matches

## Testing

### With Sample Data

1. Run the Supabase schema: `schema.sql`
2. Ensure today's date matches specials in database
3. Create a user with preferences
4. Navigate to `/specials`

### Update Specials Date

To test with existing seed data, update the date:

```sql
UPDATE specials
SET date = CURRENT_DATE
WHERE place_id IS NOT NULL;
```

## Troubleshooting

**No specials showing:**
- Check if specials table has entries for today
- Verify `date` column format (YYYY-MM-DD)
- Check Supabase connection

**Relevance scores all low:**
- Verify user preferences are set
- Check tag names match between specials and preferences
- Review scoring weights

**TypeScript errors:**
- Ensure Supabase client is properly configured
- Check interface definitions match database schema
- Verify `createClient` import path

## Related Files

- `/lib/recommender.ts` - Similar scoring algorithm for recommendations
- `/components/SpecialCard.tsx` - Card component
- `/schema.sql` - Database schema
