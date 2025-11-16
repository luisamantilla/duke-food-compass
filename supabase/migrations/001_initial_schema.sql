-- Duke Food Compass - Initial Database Schema
-- Migration: 001_initial_schema
-- Created: January 2025

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: preferences
-- ============================================
CREATE TABLE preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    dietary JSONB DEFAULT '[]'::jsonb,
    budget INTEGER,
    dislikes JSONB DEFAULT '[]'::jsonb,
    favorite_tags JSONB DEFAULT '[]'::jsonb
);

-- ============================================
-- TABLE: food_places
-- ============================================
CREATE TABLE food_places (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('dining hall', 'cafe', 'truck')),
    location TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    hours JSONB DEFAULT '{}'::jsonb
);

-- ============================================
-- TABLE: specials
-- ============================================
CREATE TABLE specials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    place_id UUID NOT NULL REFERENCES food_places(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    date DATE NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb
);

-- ============================================
-- TABLE: ratings
-- ============================================
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES food_places(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: user_history
-- ============================================
CREATE TABLE user_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    place_id UUID NOT NULL REFERENCES food_places(id) ON DELETE CASCADE,
    choice_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE: friends
-- ============================================
CREATE TABLE friends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    friend_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, friend_id),
    CHECK (user_id != friend_id)
);

-- ============================================
-- INDEXES for better query performance
-- ============================================
CREATE INDEX idx_preferences_user_id ON preferences(user_id);
CREATE INDEX idx_specials_place_id ON specials(place_id);
CREATE INDEX idx_specials_date ON specials(date);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_place_id ON ratings(place_id);
CREATE INDEX idx_ratings_created_at ON ratings(created_at);
CREATE INDEX idx_user_history_user_id ON user_history(user_id);
CREATE INDEX idx_user_history_place_id ON user_history(place_id);
CREATE INDEX idx_user_history_created_at ON user_history(created_at);
CREATE INDEX idx_friends_user_id ON friends(user_id);
CREATE INDEX idx_friends_friend_id ON friends(friend_id);
CREATE INDEX idx_friends_status ON friends(status);

-- ============================================
-- COMMENTS (Documentation)
-- ============================================
COMMENT ON TABLE users IS 'Duke students and app users';
COMMENT ON TABLE preferences IS 'User dietary preferences and settings';
COMMENT ON TABLE food_places IS 'Duke campus dining locations';
COMMENT ON TABLE specials IS 'Daily specials and deals';
COMMENT ON TABLE ratings IS 'User reviews and ratings';
COMMENT ON TABLE user_history IS 'User dining history for recommendations';
COMMENT ON TABLE friends IS 'Social connections between users';
