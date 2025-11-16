'use client'

import { useState } from 'react'
import RecommendationCard from '@/components/RecommendationCard'
import { Filter } from 'lucide-react'

export default function RecommendationsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Sample data - in production, this would come from Supabase
  const recommendations = [
    {
      name: 'The Refectory',
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
    {
      name: 'Skillet',
      cuisine: 'American, Breakfast',
      distance: '0.3 mi',
      rating: 4.6,
      priceLevel: 2,
      hours: 'Open now',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'All-day breakfast and brunch favorites',
    },
    {
      name: 'Sazon',
      cuisine: 'Mexican',
      distance: '0.4 mi',
      rating: 4.4,
      priceLevel: 1,
      hours: 'Open now',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'Fresh Mexican food with bold flavors',
    },
    {
      name: 'Cafe',
      cuisine: 'Coffee & Sandwiches',
      distance: '0.1 mi',
      rating: 4.3,
      priceLevel: 1,
      hours: 'Open now',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'Quick bites and specialty coffee',
    },
    {
      name: 'JB\'s Roastery',
      cuisine: 'American, Sandwiches',
      distance: '0.6 mi',
      rating: 4.8,
      priceLevel: 2,
      hours: 'Closes 8 PM',
      imageUrl: '/placeholder-restaurant.jpg',
      description: 'Gourmet sandwiches and fresh ingredients',
    },
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'nearby', label: 'Nearby' },
    { id: 'top-rated', label: 'Top Rated' },
    { id: 'budget', label: 'Budget Friendly' },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Recommendations</h1>
          <p className="text-blue-100">
            Personalized picks just for you
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Filter by:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search restaurants or cuisines..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Recommendations Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={index} {...rec} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium">
            Load More Recommendations
          </button>
        </div>
      </div>
    </div>
  )
}
