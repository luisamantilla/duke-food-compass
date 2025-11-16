import { Suspense } from 'react'
import MoodSelectorClient from './MoodSelectorClient'
import { Heart, Loader2 } from 'lucide-react'

export default function MoodPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Mood-Based Dining</h1>
          </div>
          <p className="text-pink-100 text-lg">
            Let your feelings guide your food choices
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mood Selector - Client Component */}
        <Suspense fallback={<MoodSelectorSkeleton />}>
          <MoodSelectorClient />
        </Suspense>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            ✨ How It Works
          </h3>
          <ul className="space-y-2.5 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white text-sm font-bold">
                1
              </span>
              <span>Select the mood that matches how you're feeling right now</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white text-sm font-bold">
                2
              </span>
              <span>We'll find places that match your vibe using their tags and style</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white text-sm font-bold">
                3
              </span>
              <span>Get a bonus if your friends recently rated those places 4+ stars!</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 text-white text-sm font-bold">
                4
              </span>
              <span>Enjoy the top 5 recommendations perfectly matched to your mood</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MoodSelectorSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}
