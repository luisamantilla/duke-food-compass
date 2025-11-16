/**
 * Example usage of the Duke Food Compass Recommendation Engine
 *
 * This file demonstrates how to use the recommendation system
 * in your application.
 */

import { createClient } from '@supabase/supabase-js';
import { getRecommendations, getDetailedRecommendations } from './recommender';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// ============================================
// EXAMPLE 1: Basic Recommendations
// ============================================

async function getBasicRecommendations(userId: string) {
  try {
    const recommendations = await getRecommendations(supabase, userId);

    console.log(`\n🍽️  Top 7 Recommendations for User ${userId}:\n`);

    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.place.name}`);
      console.log(`   📍 ${rec.place.location}`);
      console.log(`   💡 ${rec.primaryReason}`);
      console.log(`   📊 Score: ${(rec.score * 100).toFixed(1)}%`);

      if (rec.special) {
        console.log(`   🎉 ${rec.special.title} - $${rec.special.price}`);
      }

      console.log('');
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
  }
}

// ============================================
// EXAMPLE 2: Detailed Recommendations with All Reasons
// ============================================

async function getDetailedRecommendationsExample(userId: string) {
  try {
    const recommendations = await getDetailedRecommendations(supabase, userId, 5);

    console.log(`\n🔍 Detailed Recommendations for User ${userId}:\n`);

    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec.place.name} (${rec.place.type})`);
      console.log(`   Location: ${rec.place.location}`);
      console.log(`   Score: ${(rec.score * 100).toFixed(1)}%`);
      console.log(`   Tags: ${rec.place.tags.join(', ')}`);
      console.log(`   Reasons:`);

      rec.reasons.forEach(reason => {
        console.log(`     • ${reason}`);
      });

      console.log('');
    });
  } catch (error) {
    console.error('Error getting detailed recommendations:', error);
  }
}

// ============================================
// EXAMPLE 3: API Route Handler (Next.js)
// ============================================

/*
// pages/api/recommendations.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { getRecommendations } from '@/lib/recommender';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );

    const recommendations = await getRecommendations(supabase, userId);

    return res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    return res.status(500).json({
      error: 'Failed to generate recommendations',
    });
  }
}
*/

// ============================================
// EXAMPLE 4: React Component Usage
// ============================================

/*
// components/RecommendationList.tsx

'use client';

import { useEffect, useState } from 'react';
import { Recommendation } from '@/lib/recommender';

export function RecommendationList({ userId }: { userId: string }) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const response = await fetch(`/api/recommendations?userId=${userId}`);
        const data = await response.json();

        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, [userId]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Recommended for You</h2>

      {recommendations.map((rec, index) => (
        <div key={rec.place.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">
                {index + 1}. {rec.place.name}
              </h3>
              <p className="text-gray-600">{rec.place.location}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {rec.place.type}
            </span>
          </div>

          <p className="mt-2 text-gray-700 italic">
            💡 {rec.primaryReason}
          </p>

          {rec.special && (
            <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3">
              <p className="font-semibold text-yellow-800">
                🎉 {rec.special.title}
              </p>
              <p className="text-yellow-700">
                {rec.special.description} - ${rec.special.price}
              </p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {rec.place.tags.slice(0, 5).map(tag => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
*/

// ============================================
// EXAMPLE 5: Server Action (Next.js App Router)
// ============================================

/*
// app/actions/recommendations.ts

'use server';

import { createClient } from '@supabase/supabase-js';
import { getRecommendations } from '@/lib/recommender';

export async function getRecommendationsAction(userId: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  try {
    const recommendations = await getRecommendations(supabase, userId);
    return { success: true, data: recommendations };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
*/

// ============================================
// RUN EXAMPLES
// ============================================

// Uncomment to run examples:
// const exampleUserId = 'your-user-id-here';
// getBasicRecommendations(exampleUserId);
// getDetailedRecommendationsExample(exampleUserId);
