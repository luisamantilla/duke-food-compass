import { createClient } from '@/lib/supabase/server'
import SpecialCard from '@/components/SpecialCard'
import { Sparkles, TrendingUp } from 'lucide-react'

// Types
interface FoodPlace {
  id: string
  name: string
  type: string
  location: string
  tags: string[]
  hours: Record<string, string>
}

interface Special {
  id: string
  place_id: string
  title: string
  description: string | null
  price: number
  date: string
  tags: string[]
  food_places: FoodPlace
}

interface UserPreferences {
  dietary: string[]
  budget: number
  dislikes: string[]
  favorite_tags: string[]
}

interface ScoredSpecial extends Special {
  relevanceScore: number
  matchedTags: string[]
}

// Fetch today's specials from Supabase
async function getTodaysSpecials(): Promise<Special[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('specials')
    .select(`
      *,
      food_places (*)
    `)
    .eq('date', today)

  if (error) {
    console.error('Error fetching specials:', error)
    return []
  }

  return data as Special[]
}

// Fetch user preferences
async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    console.error('Error fetching preferences:', error)
    return null
  }

  return {
    dietary: data.dietary || [],
    budget: data.budget || 20,
    dislikes: data.dislikes || [],
    favorite_tags: data.favorite_tags || [],
  }
}

// Calculate relevance score for each special
function calculateRelevanceScore(
  special: Special,
  preferences: UserPreferences | null
): { score: number; matchedTags: string[] } {
  if (!preferences) {
    return { score: 0.5, matchedTags: [] }
  }

  const specialTags = special.tags || []
  const placeTags = special.food_places.tags || []
  const allTags = [...new Set([...specialTags, ...placeTags])]

  const favoriteTags = preferences.favorite_tags || []
  const dietaryTags = preferences.dietary || []
  const dislikes = preferences.dislikes || []
  const budget = preferences.budget || 20

  let score = 0
  const matchedTags: string[] = []

  // Check for disliked tags (heavy penalty)
  const hasDislikes = allTags.some(tag => dislikes.includes(tag))
  if (hasDislikes) {
    return { score: 0.1, matchedTags: [] }
  }

  // Dietary match (30% weight)
  const dietaryMatch = allTags.filter(tag => dietaryTags.includes(tag))
  if (dietaryMatch.length > 0) {
    score += 0.3 * Math.min(dietaryMatch.length / dietaryTags.length, 1)
    matchedTags.push(...dietaryMatch)
  }

  // Favorite tags match (40% weight)
  const favoriteMatch = allTags.filter(tag => favoriteTags.includes(tag))
  if (favoriteMatch.length > 0) {
    score += 0.4 * Math.min(favoriteMatch.length / Math.max(favoriteTags.length, 1), 1)
    matchedTags.push(...favoriteMatch)
  }

  // Budget match (20% weight)
  if (special.price <= budget) {
    score += 0.2
    // Extra bonus for great deals
    if (special.price <= budget * 0.7) {
      score += 0.1
    }
  }

  // Discount bonus (10% weight)
  if (specialTags.includes('discount') || specialTags.includes('combo')) {
    score += 0.1
  }

  // Remove duplicates from matched tags
  const uniqueMatchedTags = [...new Set(matchedTags)]

  return {
    score: Math.min(score, 1),
    matchedTags: uniqueMatchedTags,
  }
}

// Sort specials by relevance
function sortSpecialsByRelevance(
  specials: Special[],
  preferences: UserPreferences | null
): ScoredSpecial[] {
  const scoredSpecials: ScoredSpecial[] = specials.map(special => {
    const { score, matchedTags } = calculateRelevanceScore(special, preferences)
    return {
      ...special,
      relevanceScore: score,
      matchedTags,
    }
  })

  // Sort by relevance score (highest first), then by price (lowest first)
  scoredSpecials.sort((a, b) => {
    if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.05) {
      return b.relevanceScore - a.relevanceScore
    }
    return a.price - b.price
  })

  return scoredSpecials
}

export default async function SpecialsPage() {
  // Fetch data
  const specials = await getTodaysSpecials()

  // Get user ID from session (you'll need to implement this based on your auth)
  // For now, using a placeholder - replace with actual user session
  const userId = 'user-id-from-session' // TODO: Get from auth session

  const preferences = await getUserPreferences(userId)

  // Sort by relevance
  const sortedSpecials = sortSpecialsByRelevance(specials, preferences)

  // Calculate stats
  const hasHighlyRelevant = sortedSpecials.some(s => s.relevanceScore > 0.7)
  const inBudgetCount = preferences
    ? sortedSpecials.filter(s => s.price <= preferences.budget).length
    : specials.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Today's Specials</h1>
          </div>
          <p className="text-amber-50 text-lg">
            {sortedSpecials.length > 0
              ? `${sortedSpecials.length} special ${sortedSpecials.length === 1 ? 'offer' : 'offers'} available today`
              : 'Check back soon for new deals'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Banner */}
        {sortedSpecials.length > 0 && preferences && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hasHighlyRelevant && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-900 mb-1">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Perfect Matches</span>
                </div>
                <p className="text-sm text-blue-700">
                  We found specials that match your preferences perfectly!
                </p>
              </div>
            )}

            {preferences.budget && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-900 mb-1">
                  <span className="text-xl">💰</span>
                  <span className="font-semibold">Budget Friendly</span>
                </div>
                <p className="text-sm text-green-700">
                  {inBudgetCount} {inBudgetCount === 1 ? 'special' : 'specials'} within your ${preferences.budget} budget
                </p>
              </div>
            )}
          </div>
        )}

        {/* Specials Grid */}
        {sortedSpecials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {sortedSpecials.map((special) => (
              <SpecialCard
                key={special.id}
                special={special}
                relevanceScore={special.relevanceScore}
                matchedTags={special.matchedTags}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                  <Sparkles className="h-10 w-10 text-gray-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No new specials today
              </h2>
              <p className="text-gray-600 mb-6">
                Check again later. New deals are added daily!
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/recommendations"
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
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

        {/* Footer CTA */}
        {sortedSpecials.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-amber-500 to-orange-600 text-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-2">Never miss a deal!</h3>
            <p className="text-amber-50 mb-6 max-w-2xl mx-auto">
              Get personalized notifications when new specials match your preferences and budget.
            </p>
            <button className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-amber-50 transition-colors font-semibold shadow-md hover:shadow-lg">
              Enable Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
