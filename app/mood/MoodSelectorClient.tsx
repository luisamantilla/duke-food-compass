'use client'

import { useState, useTransition } from 'react'
import MoodSelector from '@/components/MoodSelector'
import MoodResultCard from '@/components/MoodResultCard'
import { getMoodRecommendations } from './actions'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'

interface FoodPlace {
  id: string
  name: string
  type: string
  location: string
  tags: string[]
  hours: Record<string, string>
}

interface MoodRecommendation extends FoodPlace {
  score: number
  friendBonus: boolean
  matchedTags: string[]
}

export default function MoodSelectorClient() {
  const [selectedMood, setSelectedMood] = useState<string>('')
  const [recommendations, setRecommendations] = useState<MoodRecommendation[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId)
    setShowResults(false)
    setRecommendations([])
  }

  const handleGetRecommendations = () => {
    if (!selectedMood) return

    startTransition(async () => {
      // TODO: Get actual user ID from auth
      const userId = 'user-id-from-session'

      const results = await getMoodRecommendations(selectedMood, userId)
      setRecommendations(results)
      setShowResults(true)
    })
  }

  const handleTryAgain = () => {
    setShowResults(false)
    setSelectedMood('')
    setRecommendations([])
  }

  return (
    <div>
      {/* Mood Selector */}
      {!showResults && (
        <>
          <MoodSelector
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />

          {/* Get Recommendations Button */}
          {selectedMood && (
            <div className="mt-6">
              <button
                onClick={handleGetRecommendations}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Finding Perfect Matches...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get My Recommendations
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Top 5 Picks for Your Mood
              </h2>
              <button
                onClick={handleTryAgain}
                className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Different Mood
              </button>
            </div>
            <p className="text-gray-600">
              Based on your <span className="font-semibold text-pink-600">{selectedMood}</span> mood,
              here are the best matches on campus
            </p>
          </div>

          {/* Results List */}
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <MoodResultCard
                  key={rec.id}
                  recommendation={rec}
                  rank={index + 1}
                />
              ))}
            </div>
          ) : (
            // No Results
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No matches found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find places matching this mood right now. Try a different mood!
                </p>
                <button
                  onClick={handleTryAgain}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Another Mood
                </button>
              </div>
            </div>
          )}

          {/* Stats Footer */}
          {recommendations.length > 0 && (
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600">
                    {recommendations.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Places Found
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">
                    {recommendations.filter(r => r.friendBonus).length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Friend Favorites
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(
                      recommendations.reduce((sum, r) => sum + r.score, 0) /
                        recommendations.length *
                        100
                    )}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Avg Match Score
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
