import { MapPin, Clock, DollarSign, Star } from 'lucide-react'

interface RecommendationCardProps {
  name: string
  cuisine: string
  distance?: string
  rating?: number
  priceLevel?: number
  hours?: string
  imageUrl?: string
  description?: string
}

export default function RecommendationCard({
  name,
  cuisine,
  distance,
  rating,
  priceLevel = 2,
  hours,
  imageUrl,
  description,
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="w-full h-48 bg-gray-200 relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{cuisine}</p>
          </div>
          {rating && (
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {rating}
              </span>
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {distance && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
          )}
          {hours && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{hours}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{'$'.repeat(priceLevel)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
