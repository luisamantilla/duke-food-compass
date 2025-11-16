import DiningHallRemix from '@/components/DiningHallRemix'
import { Utensils, Lightbulb } from 'lucide-react'

export default function RemixPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <Utensils className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Dining Hall Remix</h1>
          </div>
          <p className="text-orange-100 text-lg">
            Turn ordinary dining hall meals into extraordinary creations
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Component */}
        <DiningHallRemix />

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                How the Dining Hall Remix Works
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Choose Your Dining Hall</p>
                    <p className="text-sm text-gray-600">
                      Each dining hall has unique stations and ingredients
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Select Your Stations</p>
                    <p className="text-sm text-gray-600">
                      Pick at least one station you want to use. Combining multiple stations unlocks more creative hacks!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Add Optional Extras</p>
                    <p className="text-sm text-gray-600">
                      Select any condiments, sauces, or toppings to customize your hacks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mt-0.5">
                    4
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Generate Your Hacks</p>
                    <p className="text-sm text-gray-600">
                      Get 3 creative meal ideas with ingredients, steps, and the reason why it works
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="bg-white border border-orange-200 rounded-lg p-4">
            <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
              <span className="text-lg">💡</span>
              Pro Tip
            </h4>
            <p className="text-sm text-gray-700">
              Selecting 2-3 stations gives you the most creative and interesting combinations. Don't be afraid to mix cuisines!
            </p>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              <span className="text-lg">🎨</span>
              Get Creative
            </h4>
            <p className="text-sm text-gray-700">
              The meal hacks are just starting points. Feel free to swap ingredients or add your own twist based on what's available!
            </p>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-lg p-5">
          <h4 className="font-bold text-orange-900 mb-3 text-center">
            🌟 Did You Know?
          </h4>
          <div className="grid gap-3 sm:grid-cols-3 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-700">12+</div>
              <div className="text-xs text-orange-800">Preset Hacks</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-700">100s</div>
              <div className="text-xs text-red-800">Possible Combos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-700">0</div>
              <div className="text-xs text-pink-800">Extra Cost</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
