'use client'

import { useState } from 'react'

interface Mood {
  id: string
  emoji: string
  label: string
  description: string
}

const moods: Mood[] = [
  { id: 'starving', emoji: '🍕', label: "I'm starving", description: 'Big portions, filling meals' },
  { id: 'healthy-cheap', emoji: '🥗', label: 'Healthy & cheap', description: 'Fresh & affordable' },
  { id: 'comfort', emoji: '🍜', label: 'Comfort food', description: 'Cozy & familiar' },
  { id: 'new', emoji: '🌶️', label: 'Try something new', description: 'Adventure awaits' },
  { id: 'late-night', emoji: '🌙', label: 'Late night', description: 'Open late, quick bites' },
  { id: 'sweet', emoji: '🍰', label: 'Sweet cravings', description: 'Desserts & treats' },
]

interface MoodSelectorProps {
  onMoodSelect?: (moodId: string) => void
  selectedMood?: string
}

export default function MoodSelector({
  onMoodSelect,
  selectedMood,
}: MoodSelectorProps) {
  const [selected, setSelected] = useState<string>(selectedMood || '')

  const handleMoodClick = (moodId: string) => {
    setSelected(moodId)
    if (onMoodSelect) {
      onMoodSelect(moodId)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        How are you feeling?
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Select your mood to get personalized recommendations
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {moods.map((mood) => {
          const isSelected = selected === mood.id
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {mood.label}
              </div>
              <div className="text-xs text-gray-600">{mood.description}</div>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-900">
            Great! We'll find the perfect spots for your{' '}
            <span className="font-semibold">
              {moods.find((m) => m.id === selected)?.label.toLowerCase()}
            </span>{' '}
            mood.
          </p>
        </div>
      )}
    </div>
  )
}
