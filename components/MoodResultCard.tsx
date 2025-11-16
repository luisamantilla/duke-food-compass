import { MapPin, Users, Tag } from 'lucide-react'

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

interface MoodResultCardProps {
  recommendation: MoodRecommendation
  rank: number
}

export default function MoodResultCard({ recommendation, rank }: MoodResultCardProps) {
  const { name, type, location, friendBonus, matchedTags, score } = recommendation

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-pink-300 hover:shadow-lg transition-all group">
      {/* Rank Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">#{rank}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="capitalize text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                {type}
              </span>
              {friendBonus && (
                <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                  <Users className="w-3 h-3" />
                  Friends love this
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Score Badge */}
        <div className="text-right">
          <div className="text-sm text-gray-500">Match</div>
          <div className="text-lg font-bold text-pink-600">
            {Math.round(score * 100)}%
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 mb-3">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">{location}</span>
      </div>

      {/* Matched Tags */}
      {matchedTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Why it matches
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchedTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full text-xs font-medium border border-pink-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Friend Bonus Message */}
      {friendBonus && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2 border border-blue-200">
            💙 Your friends rated this place 4+ stars recently
          </p>
        </div>
      )}

      {/* CTA Button */}
      <button className="mt-4 w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
        View Details
      </button>
    </div>
  )
}

// Compact variant for smaller displays
export function MoodResultCardCompact({ recommendation, rank }: MoodResultCardProps) {
  const { name, type, location, friendBonus, score } = recommendation

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-pink-300 hover:shadow-md transition-all flex items-center gap-4">
      {/* Rank */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-sm">#{rank}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 truncate">{name}</h4>
          {friendBonus && (
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{location}</span>
          <span className="mx-1">•</span>
          <span className="capitalize">{type}</span>
        </div>
      </div>

      {/* Score */}
      <div className="flex-shrink-0 text-right">
        <div className="text-lg font-bold text-pink-600">
          {Math.round(score * 100)}%
        </div>
      </div>
    </div>
  )
}
