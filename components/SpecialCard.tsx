import { MapPin, DollarSign, Sparkles } from 'lucide-react'

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

interface SpecialCardProps {
  special: Special
  relevanceScore?: number
  matchedTags?: string[]
}

export default function SpecialCard({ special, relevanceScore, matchedTags }: SpecialCardProps) {
  const place = special.food_places

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-300">
      {/* Relevance Badge */}
      {relevanceScore !== undefined && relevanceScore > 0.7 && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3 w-3" />
            Perfect Match
          </span>
        </div>
      )}

      {/* Special Banner */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white drop-shadow-sm mb-1">
              {special.title}
            </h3>
            {special.tags.includes('discount') && (
              <span className="inline-flex items-center text-xs font-semibold text-amber-100">
                🎉 Limited Time Offer
              </span>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <DollarSign className="h-5 w-5 text-white" />
              <span className="text-2xl font-bold text-white drop-shadow-sm">
                {special.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Place Info */}
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {place.name}
          </h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{place.location}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="capitalize px-2 py-0.5 bg-gray-100 rounded text-xs font-medium">
              {place.type}
            </span>
          </div>
        </div>

        {/* Description */}
        {special.description && (
          <p className="text-gray-700 mb-4 leading-relaxed">
            {special.description}
          </p>
        )}

        {/* Special Tags */}
        {special.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {special.tags.map((tag) => {
              const isMatched = matchedTags?.includes(tag)
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    isMatched
                      ? 'bg-green-100 text-green-800 ring-2 ring-green-400'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {isMatched && <span className="mr-1">✓</span>}
                  {tag}
                </span>
              )
            })}
          </div>
        )}

        {/* Matched Preferences Message */}
        {matchedTags && matchedTags.length > 0 && (
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 mb-4">
            <p className="text-sm text-green-800 font-medium">
              💚 Matches your preferences: {matchedTags.join(', ')}
            </p>
          </div>
        )}

        {/* Additional Place Info */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Also available at {place.name}:</p>
          <div className="flex flex-wrap gap-1.5">
            {place.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800">
          View Menu & Hours
        </button>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-xl ring-2 ring-blue-400 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
    </div>
  )
}

// Compact variant for list views
export function SpecialCardCompact({ special, matchedTags }: SpecialCardProps) {
  const place = special.food_places

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-blue-300 cursor-pointer">
      {/* Price Badge */}
      <div className="flex-shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-md">
          <div className="text-center">
            <div className="text-xs font-semibold text-white opacity-90">ONLY</div>
            <div className="text-lg font-bold text-white">${special.price.toFixed(0)}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate mb-0.5">
          {special.title}
        </h4>
        <p className="text-sm text-gray-600 mb-1">
          {place.name} • {place.location}
        </p>
        {special.description && (
          <p className="text-sm text-gray-500 line-clamp-1">
            {special.description}
          </p>
        )}
        {matchedTags && matchedTags.length > 0 && (
          <div className="mt-1.5 flex items-center gap-1">
            <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-green-700 font-medium">
              Matches your preferences
            </span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  )
}
