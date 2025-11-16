import { createClient } from '@/lib/supabase/server'
import FriendActivityCard from '@/components/FriendActivityCard'
import { Users, TrendingUp } from 'lucide-react'
import { formatTimeAgo } from '@/lib/utils/time'

// Types
interface User {
  id: string
  name: string
  email: string
}

interface FoodPlace {
  id: string
  name: string
  type: string
  location: string
  tags: string[]
  hours: Record<string, string>
}

interface FriendActivity {
  id: string
  user_id: string
  place_id: string
  rating: number
  comment: string | null
  created_at: string
  users: User
  food_places: FoodPlace
}

/**
 * Fetches friend activity feed for the current user
 * This query:
 * 1. Finds all accepted friends of the current user
 * 2. Joins with ratings to get their recent reviews
 * 3. Joins with users and food_places for complete data
 * 4. Sorts by created_at descending (most recent first)
 */
async function getFriendActivity(userId: string): Promise<FriendActivity[]> {
  const supabase = await createClient()

  // Get all friend IDs for the current user
  const { data: friendships, error: friendsError } = await supabase
    .from('friends')
    .select('friend_id')
    .eq('user_id', userId)
    .eq('status', 'accepted')

  if (friendsError || !friendships) {
    console.error('Error fetching friends:', friendsError)
    return []
  }

  const friendIds = friendships.map(f => f.friend_id)

  if (friendIds.length === 0) {
    return []
  }

  // Get recent ratings from all friends
  const { data: activities, error: activitiesError } = await supabase
    .from('ratings')
    .select(`
      id,
      user_id,
      place_id,
      rating,
      comment,
      created_at,
      users!ratings_user_id_fkey (
        id,
        name,
        email
      ),
      food_places!ratings_place_id_fkey (
        id,
        name,
        type,
        location,
        tags,
        hours
      )
    `)
    .in('user_id', friendIds)
    .order('created_at', { ascending: false })
    .limit(20)

  if (activitiesError || !activities) {
    console.error('Error fetching friend activities:', activitiesError)
    return []
  }

  return activities as FriendActivity[]
}

/**
 * Get friend count and stats
 */
async function getFriendStats(userId: string) {
  const supabase = await createClient()

  const { count } = await supabase
    .from('friends')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'accepted')

  return {
    friendCount: count || 0,
  }
}

export default async function FriendsPage() {
  // Get user ID from session (placeholder - replace with actual auth)
  const userId = 'user-id-from-session' // TODO: Get from auth session

  // Fetch friend activities and stats
  const [activities, stats] = await Promise.all([
    getFriendActivity(userId),
    getFriendStats(userId),
  ])

  // Calculate some feed stats
  const recentActivities = activities.filter(a => {
    const hoursSince = (Date.now() - new Date(a.created_at).getTime()) / (1000 * 60 * 60)
    return hoursSince < 24
  })

  const highRatings = activities.filter(a => a.rating >= 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Users className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Friends Activity</h1>
          </div>
          <p className="text-purple-100 text-lg">
            See what {stats.friendCount} {stats.friendCount === 1 ? 'friend is' : 'friends are'} eating around campus
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        {activities.length > 0 && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentActivities.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-900 mb-1">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Recent Activity</span>
                </div>
                <p className="text-sm text-blue-700">
                  {recentActivities.length} {recentActivities.length === 1 ? 'review' : 'reviews'} in the last 24 hours
                </p>
              </div>
            )}

            {highRatings.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-900 mb-1">
                  <span className="text-xl">⭐</span>
                  <span className="font-semibold">Highly Rated</span>
                </div>
                <p className="text-sm text-amber-700">
                  {highRatings.length} places rated 4+ stars recently
                </p>
              </div>
            )}
          </div>
        )}

        {/* Activity Feed */}
        {activities.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Latest Reviews
            </h2>
            {activities.map((activity) => (
              <FriendActivityCard
                key={activity.id}
                activity={activity}
                timeAgo={formatTimeAgo(activity.created_at)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No friend activity yet
              </h2>
              <p className="text-gray-600 mb-6">
                {stats.friendCount === 0
                  ? "Add friends to see what they're eating!"
                  : "Your friends haven't posted any reviews yet. Check back soon!"}
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/recommendations"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                >
                  View Recommendations
                </a>
                <a
                  href="/home"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Load More (future feature) */}
        {activities.length >= 20 && (
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
              Load More Activity
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
