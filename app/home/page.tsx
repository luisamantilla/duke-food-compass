import RecommendationCard from '@/components/RecommendationCard'
import SpecialCard from '@/components/SpecialCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  // Sample data - in production, this would come from Supabase
  const featuredRecommendations = [
    {
      name: 'TheRefectory',
      cuisine: 'American, Comfort Food',
      distance: '0.2 mi',
      rating: 4.5,
      priceLevel: 2,
      hours: 'Open now',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'Classic Duke dining with a modern twist',
    },
    {
      name: 'Tandoor',
      cuisine: 'Indian',
      distance: '0.5 mi',
      rating: 4.7,
      priceLevel: 2,
      hours: 'Closes 9 PM',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'Authentic Indian cuisine near campus',
    },
  ]

  const todaysSpecials = [
    {
      restaurantName: 'Panda Express',
      specialTitle: 'Orange Chicken Bowl',
      description: 'Get 20% off our signature Orange Chicken bowl',
      discount: '20% OFF',
      days: ['Monday', 'Wednesday', 'Friday'],
      timeRange: '11:00 AM - 2:00 PM',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Welcome to Duke Food Compass</h1>
          <p className="text-blue-100">
            Discover your next favorite meal on campus
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/mood"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-semibold text-gray-900">Find by Mood</div>
            <div className="text-xs text-gray-600 mt-1">
              Match your vibe
            </div>
          </Link>
          <Link
            href="/specials"
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-semibold text-gray-900">Today's Specials</div>
            <div className="text-xs text-gray-600 mt-1">
              Save on meals
            </div>
          </Link>
        </div>

        {/* Featured Recommendations */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Recommended for You
            </h2>
            <Link
              href="/recommendations"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredRecommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} />
            ))}
          </div>
        </section>

        {/* Today's Specials Preview */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Today's Specials
            </h2>
            <Link
              href="/specials"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {todaysSpecials.map((special, index) => (
              <SpecialCard key={index} {...special} />
            ))}
          </div>
        </section>

        {/* Friends Activity Teaser */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Friend Activity
            </h2>
            <Link
              href="/friends"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-600">
              Connect with friends to see what they're eating!
            </p>
            <Link
              href="/friends"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Friends
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
