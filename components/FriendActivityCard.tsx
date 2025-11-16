import { ThumbsUp, MessageCircle, MapPin, Star } from 'lucide-react'

interface FoodPlace {
  id: string
  name: string
  type: string
  location: string
  tags: string[]
}

interface User {
  id: string
  name: string
  email: string
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

interface FriendActivityCardProps {
  activity: FriendActivity
  timeAgo: string
}

export default function FriendActivityCard({
  activity,
  timeAgo,
}: FriendActivityCardProps) {
  const friendName = activity.users.name
  const restaurantName = activity.food_places.name
  const location = activity.food_places.location
  const rating = activity.rating
  const comment = activity.comment

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-200 transition-all">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white font-bold text-sm">
            {getInitials(friendName)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-2">
            <span className="font-semibold text-gray-900">{friendName}</span>
            <span className="text-gray-600"> rated </span>
            <span className="font-semibold text-blue-600">
              {restaurantName}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {rating}/5
            </span>
          </div>

          {/* Comment */}
          {comment && (
            <p className="text-sm text-gray-700 mb-3 leading-relaxed line-clamp-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              &quot;{comment}&quot;
            </p>
          )}

          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
              <span className="mx-1 text-gray-300">•</span>
              <span className="capitalize text-xs bg-gray-100 px-2 py-0.5 rounded">
                {activity.food_places.type}
              </span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span className="font-medium">{timeAgo}</span>
            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group">
              <ThumbsUp className="w-3.5 h-3.5 group-hover:fill-blue-600" />
              <span>Like</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors group">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Comment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
