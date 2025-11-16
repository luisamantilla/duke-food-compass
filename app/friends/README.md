# Friends Feed - Usage Guide

## Overview

The Friends Feed is a **Next.js server component** that displays recent dining activity from your friends. It shows what friends ate, their ratings, comments, and time since the activity.

## Features

### ✅ Server-Side Rendering
- Fetches friend activity at request time
- No client-side loading states
- Fresh data on each page load

### 🔍 Supabase Query Architecture

The page uses a **two-step query pattern** for optimal performance:

#### Step 1: Find All Friends
```typescript
const { data: friendships } = await supabase
  .from('friends')
  .select('friend_id')
  .eq('user_id', userId)
  .eq('status', 'accepted')
```

#### Step 2: Get Friend Ratings with Joins
```typescript
const { data: activities } = await supabase
  .from('ratings')
  .select(`
    id,
    user_id,
    place_id,
    rating,
    comment,
    created_at,
    users!ratings_user_id_fkey (id, name, email),
    food_places!ratings_place_id_fkey (id, name, type, location, tags, hours)
  `)
  .in('user_id', friendIds)
  .order('created_at', { ascending: false })
  .limit(20)
```

### 📊 What's Displayed

Each activity card shows:
- ✓ **Friend name** - Who posted the review
- ✓ **What they ate** - Restaurant/dining hall name
- ✓ **Rating** - 1-5 stars with visual display
- ✓ **Comment** - Their review text
- ✓ **Time ago** - "2 hours ago", "1 day ago", etc.
- ✓ **Location** - Where the place is located
- ✓ **Place type** - Dining hall, cafe, or food truck

### 🎨 Dynamic UI Elements

**Stats Banners:**
```
📊 Recent Activity - Shows reviews from last 24 hours
⭐ Highly Rated - Shows places rated 4+ stars
```

**Empty States:**
```
No friends:  "Add friends to see what they're eating!"
No activity: "Your friends haven't posted any reviews yet"
```

## File Structure

```
app/friends/
├── page.tsx           # Server component with queries
└── README.md          # This documentation

components/
└── FriendActivityCard.tsx  # Activity card component

lib/
└── utils/
    └── time.ts        # Time formatting utilities
```

## Database Schema

### Friends Table
```sql
CREATE TABLE friends (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),      -- The user
    friend_id UUID REFERENCES users(id),    -- Their friend
    status TEXT DEFAULT 'accepted',         -- pending, accepted, blocked
    created_at TIMESTAMP,
    UNIQUE(user_id, friend_id),
    CHECK (user_id != friend_id)
);
```

**Indexes:**
- `idx_friends_user_id` - Fast lookup of user's friends
- `idx_friends_friend_id` - Fast reverse lookups
- `idx_friends_status` - Filter by friendship status

### Key Relationships
```
User A ←→ Friends Table ←→ User B
                              ↓
                          Ratings Table
                              ↓
                       Food Places Table
```

## Usage

### Basic Setup

The page automatically runs as a server component. Navigate to `/friends`.

### Getting User ID

Replace the placeholder on line 117:

```typescript
// Current (placeholder)
const userId = 'user-id-from-session' // TODO: Get from auth session

// With actual Supabase auth
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
const userId = user?.id
```

## Query Explanation

### `getFriendActivity(userId: string)`

**Purpose:** Fetches recent ratings from all accepted friends

**Steps:**
1. Query `friends` table for all `friend_id` where `user_id` matches and status is 'accepted'
2. Extract friend IDs into an array
3. Query `ratings` table where `user_id` is in the friend IDs array
4. Join with `users` table to get friend names
5. Join with `food_places` table to get restaurant details
6. Order by `created_at` descending (most recent first)
7. Limit to 20 results

**Returns:** `FriendActivity[]`

```typescript
interface FriendActivity {
  id: string
  user_id: string
  place_id: string
  rating: number              // 1-5
  comment: string | null
  created_at: string          // ISO timestamp
  users: {
    id: string
    name: string
    email: string
  }
  food_places: {
    id: string
    name: string
    type: string              // dining hall, cafe, truck
    location: string
    tags: string[]
    hours: Record<string, string>
  }
}
```

### `getFriendStats(userId: string)`

**Purpose:** Get friend count for display

**Query:**
```typescript
const { count } = await supabase
  .from('friends')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId)
  .eq('status', 'accepted')
```

**Returns:** `{ friendCount: number }`

## Time Formatting

Uses `formatTimeAgo()` from `/lib/utils/time.ts`:

```typescript
formatTimeAgo('2024-11-16T10:30:00Z')
// Returns: "2 hours ago", "1 day ago", etc.
```

**Output Examples:**
- Less than 10 seconds: "just now"
- Less than 1 minute: "X seconds ago"
- Less than 1 hour: "X minutes ago"
- Less than 24 hours: "X hours ago"
- Less than 7 days: "X days ago"
- Less than 4 weeks: "X weeks ago"
- Less than 12 months: "X months ago"
- 12+ months: "X years ago"

## Components

### FriendActivityCard

**Props:**
```typescript
{
  activity: FriendActivity,
  timeAgo: string
}
```

**Features:**
- Gradient avatar with initials
- 5-star rating display with filled/empty stars
- Quoted comment in styled box
- Location badge with place type
- Interactive "Like" and "Comment" buttons
- Hover effects

## Styling

- Tailwind CSS with responsive layout
- Purple/pink gradient header
- Shadow and border hover effects
- Stats banners with gradient backgrounds
- Clean typography with proper spacing

## Performance Optimizations

1. **Parallel Queries:**
   ```typescript
   const [activities, stats] = await Promise.all([
     getFriendActivity(userId),
     getFriendStats(userId),
   ])
   ```

2. **Database Indexes:**
   - Fast friend lookups via `idx_friends_user_id`
   - Fast rating queries via `idx_ratings_user_id` and `idx_ratings_created_at`

3. **Query Limits:**
   - Maximum 20 activities per page load
   - Can add pagination later

4. **Efficient Joins:**
   - Single query with nested joins vs multiple round trips
   - Uses foreign key constraints for query optimization

## Testing

### With Seed Data

1. Run the updated schema: `schema.sql`
2. Seed data creates friendships between sample users
3. Recent ratings are added with realistic timestamps
4. Navigate to `/friends` to see the feed

### Sample Friend Network

```
Alex Johnson
├─ Sam Patel (friend)
├─ Jordan Lee (friend)
└─ Taylor Smith (friend)

Sam Patel
├─ Alex Johnson (friend)
├─ Morgan Davis (friend)
└─ Jordan Lee (friend)
```

### Create Test Friendships

```sql
-- Make User A and User B friends (bidirectional)
INSERT INTO friends (user_id, friend_id, status)
VALUES
  ((SELECT id FROM users WHERE email = 'usera@duke.edu'),
   (SELECT id FROM users WHERE email = 'userb@duke.edu'),
   'accepted'),
  ((SELECT id FROM users WHERE email = 'userb@duke.edu'),
   (SELECT id FROM users WHERE email = 'usera@duke.edu'),
   'accepted');
```

## Troubleshooting

**No activities showing:**
- Check if user has accepted friends in `friends` table
- Verify friends have ratings in `ratings` table
- Check Supabase connection and auth

**Wrong user's activities:**
- Verify `userId` is correct from auth session
- Check `friends.user_id` matches current user

**Old timestamps:**
- Seed data uses `NOW() - INTERVAL` for realistic times
- Adjust intervals in schema.sql if needed

**Foreign key errors in queries:**
- Ensure you're using correct foreign key names:
  - `users!ratings_user_id_fkey`
  - `food_places!ratings_place_id_fkey`

## Future Enhancements

- [ ] Pagination / infinite scroll
- [ ] Filter by rating (e.g., only 4+ stars)
- [ ] Filter by place type (dining hall, cafe, truck)
- [ ] Search friends by name
- [ ] Real-time updates with Supabase subscriptions
- [ ] Like/comment functionality
- [ ] Friend suggestions
- [ ] Activity notifications

## Related Files

- `/lib/recommender.ts` - Uses friend ratings in recommendation algorithm
- `/components/FriendActivityCard.tsx` - Activity card component
- `/lib/utils/time.ts` - Time formatting utilities
- `/schema.sql` - Database schema with friends table
