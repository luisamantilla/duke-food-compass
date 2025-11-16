#!/usr/bin/env tsx

/**
 * Duke Food Compass - Database Seeding Script
 *
 * This script populates your Supabase database with seed data.
 *
 * Usage:
 *   npm run seed
 *   or
 *   npx tsx scripts/seed-database.ts
 *
 * Prerequisites:
 *   - Supabase project created
 *   - Tables created (run 001_initial_schema.sql first)
 *   - Environment variables set in .env.local
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: Missing required environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// ============================================
// SEED DATA
// ============================================

const users = [
  { name: 'Alex Johnson', email: 'alex.j@duke.edu' },
  { name: 'Sam Patel', email: 'sam.p@duke.edu' },
  { name: 'Jordan Lee', email: 'jordan.l@duke.edu' },
  { name: 'Taylor Smith', email: 'taylor.s@duke.edu' },
  { name: 'Morgan Davis', email: 'morgan.d@duke.edu' },
  { name: 'Casey Williams', email: 'casey.w@duke.edu' },
  { name: 'Riley Chen', email: 'riley.c@duke.edu' },
  { name: 'Dakota Martinez', email: 'dakota.m@duke.edu' },
  { name: 'Avery Brown', email: 'avery.b@duke.edu' },
  { name: 'Jamie Garcia', email: 'jamie.g@duke.edu' },
]

const foodPlaces = [
  {
    name: "Marketplace",
    type: "dining hall",
    location: "East Campus",
    tags: ["buffet", "all-you-can-eat", "vegetarian", "vegan", "halal"],
    hours: {
      monday: "7:00 AM - 9:00 PM",
      tuesday: "7:00 AM - 9:00 PM",
      wednesday: "7:00 AM - 9:00 PM",
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "9:00 AM - 9:00 PM"
    }
  },
  {
    name: "Twinnies",
    type: "dining hall",
    location: "West Campus",
    tags: ["buffet", "all-you-can-eat", "vegetarian", "vegan", "gluten-free"],
    hours: {
      monday: "7:00 AM - 9:00 PM",
      tuesday: "7:00 AM - 9:00 PM",
      wednesday: "7:00 AM - 9:00 PM",
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "10:00 AM - 8:00 PM",
      sunday: "10:00 AM - 9:00 PM"
    }
  },
  {
    name: "The Loop",
    type: "dining hall",
    location: "Central Campus",
    tags: ["buffet", "international", "healthy", "vegetarian"],
    hours: {
      monday: "7:30 AM - 8:00 PM",
      tuesday: "7:30 AM - 8:00 PM",
      wednesday: "7:30 AM - 8:00 PM",
      thursday: "7:30 AM - 8:00 PM",
      friday: "7:30 AM - 7:00 PM",
      saturday: "10:00 AM - 7:00 PM",
      sunday: "10:00 AM - 8:00 PM"
    }
  },
  {
    name: "The Pit",
    type: "cafe",
    location: "Bryan Center",
    tags: ["pizza", "grill", "comfort-food", "quick"],
    hours: {
      monday: "11:00 AM - 11:00 PM",
      tuesday: "11:00 AM - 11:00 PM",
      wednesday: "11:00 AM - 11:00 PM",
      thursday: "11:00 AM - 11:00 PM",
      friday: "11:00 AM - 9:00 PM",
      saturday: "12:00 PM - 9:00 PM",
      sunday: "12:00 PM - 11:00 PM"
    }
  },
  {
    name: "Cafe",
    type: "cafe",
    location: "Perkins Library",
    tags: ["coffee", "sandwiches", "pastries", "study-spot"],
    hours: {
      monday: "7:30 AM - 2:00 AM",
      tuesday: "7:30 AM - 2:00 AM",
      wednesday: "7:30 AM - 2:00 AM",
      thursday: "7:30 AM - 2:00 AM",
      friday: "7:30 AM - 10:00 PM",
      saturday: "9:00 AM - 10:00 PM",
      sunday: "9:00 AM - 2:00 AM"
    }
  },
  // Add more food places as needed...
  // For brevity, showing first 5. You can add all 20.
]

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => new Date().toISOString().split('T')[0]

// ============================================
// SEEDING FUNCTIONS
// ============================================

async function clearExistingData() {
  console.log('🗑️  Clearing existing data...')

  // Delete in order to respect foreign key constraints
  await supabase.from('user_history').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('ratings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('friends').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('specials').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('preferences').delete().neq('user_id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('food_places').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('✅ Existing data cleared')
}

async function seedUsers() {
  console.log('👥 Seeding users...')

  const { data, error } = await supabase
    .from('users')
    .insert(users)
    .select()

  if (error) {
    console.error('❌ Error seeding users:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} users`)
  return data
}

async function seedFoodPlaces() {
  console.log('🍽️  Seeding food places...')

  const { data, error } = await supabase
    .from('food_places')
    .insert(foodPlaces)
    .select()

  if (error) {
    console.error('❌ Error seeding food places:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} food places`)
  return data
}

async function seedPreferences(users: any[]) {
  console.log('⚙️  Seeding user preferences...')

  const preferences = users.map((user) => ({
    user_id: user.id,
    dietary: user.name === 'Alex Johnson' ? ['vegetarian', 'gluten-free'] :
             user.name === 'Sam Patel' ? ['vegan', 'halal'] :
             user.name === 'Jordan Lee' ? ['pescatarian'] :
             user.name === 'Morgan Davis' ? ['vegetarian'] :
             [],
    budget: user.name === 'Alex Johnson' ? 15 :
            user.name === 'Sam Patel' ? 10 :
            user.name === 'Jordan Lee' ? 20 :
            user.name === 'Taylor Smith' ? 12 :
            15,
    dislikes: user.name === 'Alex Johnson' ? ['spicy'] :
              user.name === 'Sam Patel' ? ['dairy'] :
              [],
    favorite_tags: user.name === 'Alex Johnson' ? ['healthy', 'salads', 'organic'] :
                   user.name === 'Sam Patel' ? ['indian', 'asian', 'curry'] :
                   user.name === 'Jordan Lee' ? ['sushi', 'japanese', 'asian'] :
                   user.name === 'Taylor Smith' ? ['pizza', 'italian', 'comfort-food'] :
                   ['quick', 'casual']
  }))

  const { data, error } = await supabase
    .from('preferences')
    .insert(preferences)
    .select()

  if (error) {
    console.error('❌ Error seeding preferences:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} user preferences`)
  return data
}

async function seedSpecials(places: any[]) {
  console.log('⭐ Seeding specials...')

  const today = getToday()

  const specials = [
    {
      place_id: places.find(p => p.name === 'Marketplace')?.id,
      title: 'Breakfast Buffet Special',
      description: 'All-you-can-eat breakfast with endless coffee',
      price: 11.99,
      date: today,
      tags: ['breakfast', 'buffet', 'weekend']
    },
    {
      place_id: places.find(p => p.name === 'The Pit')?.id,
      title: 'Wing Wednesday',
      description: '50 cent wings with any drink purchase',
      price: 0.50,
      date: today,
      tags: ['wings', 'discount', 'dinner']
    },
    {
      place_id: places.find(p => p.name === 'Cafe')?.id,
      title: 'Morning Brew Special',
      description: 'Coffee and pastry combo',
      price: 5.00,
      date: today,
      tags: ['coffee', 'breakfast', 'discount']
    },
    // Add more specials as needed
  ].filter(s => s.place_id) // Filter out any undefined place_ids

  const { data, error } = await supabase
    .from('specials')
    .insert(specials)
    .select()

  if (error) {
    console.error('❌ Error seeding specials:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} specials`)
  return data
}

async function seedRatings(users: any[], places: any[]) {
  console.log('⭐ Seeding ratings...')

  const marketplace = places.find(p => p.name === 'Marketplace')
  const thePit = places.find(p => p.name === 'The Pit')
  const cafe = places.find(p => p.name === 'Cafe')

  const ratings = [
    {
      user_id: users[0].id,
      place_id: marketplace?.id,
      rating: 4,
      comment: 'Great variety, something for everyone!'
    },
    {
      user_id: users[1].id,
      place_id: thePit?.id,
      rating: 5,
      comment: 'Best wings on campus!'
    },
    {
      user_id: users[2].id,
      place_id: cafe?.id,
      rating: 4,
      comment: 'Perfect study spot with good coffee'
    },
    // Add more ratings as needed
  ].filter(r => r.place_id && r.user_id)

  const { data, error } = await supabase
    .from('ratings')
    .insert(ratings)
    .select()

  if (error) {
    console.error('❌ Error seeding ratings:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} ratings`)
  return data
}

async function seedFriends(users: any[]) {
  console.log('👫 Seeding friend relationships...')

  const friends = [
    // Alex Johnson's friends
    { user_id: users[0].id, friend_id: users[1].id, status: 'accepted' },
    { user_id: users[0].id, friend_id: users[2].id, status: 'accepted' },
    // Sam Patel's friends
    { user_id: users[1].id, friend_id: users[0].id, status: 'accepted' },
    { user_id: users[1].id, friend_id: users[3].id, status: 'accepted' },
    // Jordan Lee's friends
    { user_id: users[2].id, friend_id: users[0].id, status: 'accepted' },
    { user_id: users[2].id, friend_id: users[1].id, status: 'accepted' },
    { user_id: users[2].id, friend_id: users[3].id, status: 'accepted' },
    // Add more friend connections as needed
  ]

  const { data, error } = await supabase
    .from('friends')
    .insert(friends)
    .select()

  if (error) {
    console.error('❌ Error seeding friends:', error)
    throw error
  }

  console.log(`✅ Inserted ${data.length} friend relationships`)
  return data
}

// ============================================
// MAIN SEEDING FUNCTION
// ============================================

async function main() {
  console.log('🌱 Starting database seeding...\n')

  try {
    // Optional: Clear existing data (comment out if you want to keep existing data)
    // await clearExistingData()

    // Seed in order (respecting foreign key dependencies)
    const insertedUsers = await seedUsers()
    const insertedPlaces = await seedFoodPlaces()
    await seedPreferences(insertedUsers)
    await seedSpecials(insertedPlaces)
    await seedRatings(insertedUsers, insertedPlaces)
    await seedFriends(insertedUsers)

    console.log('\n✅ Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Users: ${insertedUsers.length}`)
    console.log(`   - Food Places: ${insertedPlaces.length}`)
    console.log(`   - (Plus preferences, specials, ratings, and friends)`)
    console.log('\n🎉 Your database is ready to use!')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Run the seeding script
main()
