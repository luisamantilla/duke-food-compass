-- Duke Food Compass Database Schema
-- Supabase SQL Script

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
-- SEED DATA: Duke Food Places
-- ============================================

-- Dining Halls
INSERT INTO food_places (name, type, location, tags, hours) VALUES
('Marketplace', 'dining hall', 'East Campus',
 '["buffet", "all-you-can-eat", "vegetarian", "vegan", "halal"]',
 '{"monday": "7:00 AM - 9:00 PM", "tuesday": "7:00 AM - 9:00 PM", "wednesday": "7:00 AM - 9:00 PM", "thursday": "7:00 AM - 9:00 PM", "friday": "7:00 AM - 8:00 PM", "saturday": "9:00 AM - 8:00 PM", "sunday": "9:00 AM - 9:00 PM"}'),

('Twinnies', 'dining hall', 'West Campus',
 '["buffet", "all-you-can-eat", "vegetarian", "vegan", "gluten-free"]',
 '{"monday": "7:00 AM - 9:00 PM", "tuesday": "7:00 AM - 9:00 PM", "wednesday": "7:00 AM - 9:00 PM", "thursday": "7:00 AM - 9:00 PM", "friday": "7:00 AM - 8:00 PM", "saturday": "10:00 AM - 8:00 PM", "sunday": "10:00 AM - 9:00 PM"}'),

('The Loop', 'dining hall', 'Central Campus',
 '["buffet", "international", "healthy", "vegetarian"]',
 '{"monday": "7:30 AM - 8:00 PM", "tuesday": "7:30 AM - 8:00 PM", "wednesday": "7:30 AM - 8:00 PM", "thursday": "7:30 AM - 8:00 PM", "friday": "7:30 AM - 7:00 PM", "saturday": "10:00 AM - 7:00 PM", "sunday": "10:00 AM - 8:00 PM"}'),

-- Cafes and Restaurants
('The Pit', 'cafe', 'Bryan Center',
 '["pizza", "grill", "comfort-food", "quick"]',
 '{"monday": "11:00 AM - 11:00 PM", "tuesday": "11:00 AM - 11:00 PM", "wednesday": "11:00 AM - 11:00 PM", "thursday": "11:00 AM - 11:00 PM", "friday": "11:00 AM - 9:00 PM", "saturday": "12:00 PM - 9:00 PM", "sunday": "12:00 PM - 11:00 PM"}'),

('Cafe', 'cafe', 'Perkins Library',
 '["coffee", "sandwiches", "pastries", "study-spot"]',
 '{"monday": "7:30 AM - 2:00 AM", "tuesday": "7:30 AM - 2:00 AM", "wednesday": "7:30 AM - 2:00 AM", "thursday": "7:30 AM - 2:00 AM", "friday": "7:30 AM - 10:00 PM", "saturday": "9:00 AM - 10:00 PM", "sunday": "9:00 AM - 2:00 AM"}'),

('Bella Union', 'cafe', 'Brodhead Center',
 '["fine-dining", "upscale", "dinner", "date-spot"]',
 '{"monday": "5:00 PM - 9:00 PM", "tuesday": "5:00 PM - 9:00 PM", "wednesday": "5:00 PM - 9:00 PM", "thursday": "5:00 PM - 9:00 PM", "friday": "5:00 PM - 9:00 PM"}'),

('The Gyotaku', 'cafe', 'Brodhead Center',
 '["sushi", "asian", "japanese", "healthy"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('Sazon', 'cafe', 'Brodhead Center',
 '["latin", "mexican", "burritos", "tacos"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('Farmstead', 'cafe', 'Brodhead Center',
 '["farm-to-table", "healthy", "salads", "organic"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('Tandoor', 'cafe', 'Brodhead Center',
 '["indian", "curry", "vegetarian", "spicy"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('Il Forno', 'cafe', 'West Union',
 '["italian", "pizza", "pasta", "brick-oven"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('Ginger + Soy', 'cafe', 'West Union',
 '["asian", "stir-fry", "noodles", "quick"]',
 '{"monday": "11:00 AM - 9:00 PM", "tuesday": "11:00 AM - 9:00 PM", "wednesday": "11:00 AM - 9:00 PM", "thursday": "11:00 AM - 9:00 PM", "friday": "11:00 AM - 8:00 PM"}'),

('The Skillet', 'cafe', 'West Union',
 '["breakfast", "brunch", "american", "comfort-food"]',
 '{"monday": "7:30 AM - 2:00 PM", "tuesday": "7:30 AM - 2:00 PM", "wednesday": "7:30 AM - 2:00 PM", "thursday": "7:30 AM - 2:00 PM", "friday": "7:30 AM - 2:00 PM"}'),

('The Dillo', 'cafe', 'CIEMAS',
 '["sandwiches", "salads", "coffee", "quick"]',
 '{"monday": "8:00 AM - 4:00 PM", "tuesday": "8:00 AM - 4:00 PM", "wednesday": "8:00 AM - 4:00 PM", "thursday": "8:00 AM - 4:00 PM", "friday": "8:00 AM - 3:00 PM"}'),

('Twinnie''s To Go', 'cafe', 'West Campus',
 '["grab-and-go", "sandwiches", "quick", "coffee"]',
 '{"monday": "7:00 AM - 11:00 PM", "tuesday": "7:00 AM - 11:00 PM", "wednesday": "7:00 AM - 11:00 PM", "thursday": "7:00 AM - 11:00 PM", "friday": "7:00 AM - 8:00 PM", "saturday": "10:00 AM - 8:00 PM", "sunday": "10:00 AM - 11:00 PM"}'),

-- Food Trucks
('Pitchforks', 'truck', 'Plaza Drive',
 '["american", "burgers", "fries", "outdoor"]',
 '{"monday": "11:00 AM - 3:00 PM", "tuesday": "11:00 AM - 3:00 PM", "wednesday": "11:00 AM - 3:00 PM", "thursday": "11:00 AM - 3:00 PM", "friday": "11:00 AM - 3:00 PM"}'),

('Blue Express', 'truck', 'Various Locations',
 '["food-truck", "rotating-menu", "lunch", "outdoor"]',
 '{"monday": "11:30 AM - 2:30 PM", "tuesday": "11:30 AM - 2:30 PM", "wednesday": "11:30 AM - 2:30 PM", "thursday": "11:30 AM - 2:30 PM", "friday": "11:30 AM - 2:30 PM"}'),

('Devil''s Krafthouse', 'cafe', 'Sanford Building',
 '["sandwiches", "burgers", "comfort-food", "casual"]',
 '{"monday": "11:00 AM - 8:00 PM", "tuesday": "11:00 AM - 8:00 PM", "wednesday": "11:00 AM - 8:00 PM", "thursday": "11:00 AM - 8:00 PM", "friday": "11:00 AM - 7:00 PM"}'),

('McDonald''s @ WU', 'cafe', 'West Union',
 '["fast-food", "burgers", "quick", "cheap"]',
 '{"monday": "7:00 AM - 2:00 AM", "tuesday": "7:00 AM - 2:00 AM", "wednesday": "7:00 AM - 2:00 AM", "thursday": "7:00 AM - 2:00 AM", "friday": "7:00 AM - 11:00 PM", "saturday": "10:00 AM - 11:00 PM", "sunday": "10:00 AM - 2:00 AM"}'),

('JB''s Roasts & Chops', 'cafe', 'Penn Pavilion',
 '["deli", "sandwiches", "roast-beef", "casual"]',
 '{"monday": "11:00 AM - 8:00 PM", "tuesday": "11:00 AM - 8:00 PM", "wednesday": "11:00 AM - 8:00 PM", "thursday": "11:00 AM - 8:00 PM", "friday": "11:00 AM - 7:00 PM"}');

-- ============================================
-- SEED DATA: Sample Users
-- ============================================
INSERT INTO users (name, email) VALUES
('Alex Johnson', 'alex.j@duke.edu'),
('Sam Patel', 'sam.p@duke.edu'),
('Jordan Lee', 'jordan.l@duke.edu'),
('Taylor Smith', 'taylor.s@duke.edu'),
('Morgan Davis', 'morgan.d@duke.edu');

-- ============================================
-- SEED DATA: Sample Preferences
-- ============================================
INSERT INTO preferences (user_id, dietary, budget, dislikes, favorite_tags)
SELECT
    id,
    CASE
        WHEN name = 'Alex Johnson' THEN '["vegetarian", "gluten-free"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["vegan", "halal"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["pescatarian"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '[]'::jsonb
        ELSE '["vegetarian"]'::jsonb
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN 15
        WHEN name = 'Sam Patel' THEN 10
        WHEN name = 'Jordan Lee' THEN 20
        WHEN name = 'Taylor Smith' THEN 12
        ELSE 8
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN '["spicy"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["dairy"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["mushrooms"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '["olives"]'::jsonb
        ELSE '[]'::jsonb
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN '["healthy", "salads", "organic"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["indian", "asian", "curry"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["sushi", "japanese", "asian"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '["pizza", "italian", "comfort-food"]'::jsonb
        ELSE '["coffee", "quick"]'::jsonb
    END
FROM users;

-- ============================================
-- SEED DATA: Sample Specials
-- ============================================
INSERT INTO specials (place_id, title, description, price, date, tags)
SELECT
    id,
    'Taco Tuesday Special',
    'Buy one taco, get one 50% off',
    6.99,
    CURRENT_DATE,
    '["mexican", "discount", "lunch"]'::jsonb
FROM food_places WHERE name = 'Sazon'

UNION ALL

SELECT
    id,
    'Sushi Combo',
    'California roll + miso soup + edamame',
    12.99,
    CURRENT_DATE,
    '["japanese", "combo", "healthy"]'::jsonb
FROM food_places WHERE name = 'The Gyotaku'

UNION ALL

SELECT
    id,
    'Pizza & Drink Deal',
    'Any personal pizza with fountain drink',
    8.99,
    CURRENT_DATE,
    '["italian", "combo", "lunch"]'::jsonb
FROM food_places WHERE name = 'Il Forno'

UNION ALL

SELECT
    id,
    'Morning Brew Special',
    'Coffee and pastry for $5',
    5.00,
    CURRENT_DATE,
    '["breakfast", "coffee", "discount"]'::jsonb
FROM food_places WHERE name = 'Cafe'

UNION ALL

SELECT
    id,
    'Farm Bowl Special',
    'Build your own grain bowl with fresh seasonal veggies',
    9.99,
    CURRENT_DATE,
    '["healthy", "organic", "vegetarian"]'::jsonb
FROM food_places WHERE name = 'Farmstead';

-- ============================================
-- SEED DATA: Sample Ratings
-- ============================================
INSERT INTO ratings (user_id, place_id, rating, comment)
SELECT
    u.id,
    fp.id,
    4,
    'Great vegetarian options and fresh ingredients!'
FROM users u, food_places fp
WHERE u.name = 'Alex Johnson' AND fp.name = 'Farmstead'

UNION ALL

SELECT
    u.id,
    fp.id,
    5,
    'Best sushi on campus, always fresh'
FROM users u, food_places fp
WHERE u.name = 'Jordan Lee' AND fp.name = 'The Gyotaku'

UNION ALL

SELECT
    u.id,
    fp.id,
    3,
    'Good for late night studying, decent coffee'
FROM users u, food_places fp
WHERE u.name = 'Taylor Smith' AND fp.name = 'Cafe'

UNION ALL

SELECT
    u.id,
    fp.id,
    5,
    'Amazing curry, authentic flavors!'
FROM users u, food_places fp
WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor'

UNION ALL

SELECT
    u.id,
    fp.id,
    4,
    'Great variety, something for everyone'
FROM users u, food_places fp
WHERE u.name = 'Morgan Davis' AND fp.name = 'Marketplace';

-- ============================================
-- SEED DATA: Sample User History
-- ============================================
INSERT INTO user_history (user_id, place_id, choice_reason)
SELECT
    u.id,
    fp.id,
    'Wanted something healthy and organic'
FROM users u, food_places fp
WHERE u.name = 'Alex Johnson' AND fp.name = 'Farmstead'

UNION ALL

SELECT
    u.id,
    fp.id,
    'Craving sushi for lunch'
FROM users u, food_places fp
WHERE u.name = 'Jordan Lee' AND fp.name = 'The Gyotaku'

UNION ALL

SELECT
    u.id,
    fp.id,
    'Need coffee for late night study session'
FROM users u, food_places fp
WHERE u.name = 'Taylor Smith' AND fp.name = 'Cafe'

UNION ALL

SELECT
    u.id,
    fp.id,
    'Meeting friends for dinner at Bella Union'
FROM users u, food_places fp
WHERE u.name = 'Alex Johnson' AND fp.name = 'Bella Union'

UNION ALL

SELECT
    u.id,
    fp.id,
    'Quick lunch between classes'
FROM users u, food_places fp
WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor';

-- ============================================
-- SEED DATA: Friend Relationships
-- ============================================
-- Alex Johnson's friends
INSERT INTO friends (user_id, friend_id, status)
SELECT
    u1.id,
    u2.id,
    'accepted'
FROM users u1, users u2
WHERE u1.name = 'Alex Johnson' AND u2.name IN ('Sam Patel', 'Jordan Lee', 'Taylor Smith')

UNION ALL

-- Sam Patel's friends (bidirectional for Alex)
SELECT
    u1.id,
    u2.id,
    'accepted'
FROM users u1, users u2
WHERE u1.name = 'Sam Patel' AND u2.name IN ('Alex Johnson', 'Morgan Davis', 'Jordan Lee')

UNION ALL

-- Jordan Lee's friends
SELECT
    u1.id,
    u2.id,
    'accepted'
FROM users u1, users u2
WHERE u1.name = 'Jordan Lee' AND u2.name IN ('Alex Johnson', 'Sam Patel', 'Taylor Smith', 'Morgan Davis')

UNION ALL

-- Taylor Smith's friends
SELECT
    u1.id,
    u2.id,
    'accepted'
FROM users u1, users u2
WHERE u1.name = 'Taylor Smith' AND u2.name IN ('Alex Johnson', 'Jordan Lee')

UNION ALL

-- Morgan Davis's friends
SELECT
    u1.id,
    u2.id,
    'accepted'
FROM users u1, users u2
WHERE u1.name = 'Morgan Davis' AND u2.name IN ('Sam Patel', 'Jordan Lee');

-- ============================================
-- SEED DATA: Additional Ratings for Friend Feed
-- ============================================
-- Recent ratings from friends to populate the feed
INSERT INTO ratings (user_id, place_id, rating, comment, created_at)
SELECT
    u.id,
    fp.id,
    5,
    'The pasta is absolutely incredible! Best Italian food near campus.',
    NOW() - INTERVAL '2 hours'
FROM users u, food_places fp
WHERE u.name = 'Sam Patel' AND fp.name = 'Il Forno'

UNION ALL

SELECT
    u.id,
    fp.id,
    4,
    'Great breakfast spot. The pancakes are huge and delicious!',
    NOW() - INTERVAL '5 hours'
FROM users u, food_places fp
WHERE u.name = 'Jordan Lee' AND fp.name = 'The Skillet'

UNION ALL

SELECT
    u.id,
    fp.id,
    5,
    'Perfect study spot with amazing coffee and pastries.',
    NOW() - INTERVAL '8 hours'
FROM users u, food_places fp
WHERE u.name = 'Taylor Smith' AND fp.name = 'The Dillo'

UNION ALL

SELECT
    u.id,
    fp.id,
    3,
    'Decent quick meal, but nothing special. Good for when you''re in a rush.',
    NOW() - INTERVAL '1 day'
FROM users u, food_places fp
WHERE u.name = 'Morgan Davis' AND fp.name = 'McDonald''s @ WU'

UNION ALL

SELECT
    u.id,
    fp.id,
    5,
    'The burritos are massive and so flavorful! Love the fresh ingredients.',
    NOW() - INTERVAL '1 day'
FROM users u, food_places fp
WHERE u.name = 'Sam Patel' AND fp.name = 'Sazon'

UNION ALL

SELECT
    u.id,
    fp.id,
    4,
    'Really good stir fry with lots of veggie options. Quick service too.',
    NOW() - INTERVAL '2 days'
FROM users u, food_places fp
WHERE u.name = 'Jordan Lee' AND fp.name = 'Ginger + Soy'

UNION ALL

SELECT
    u.id,
    fp.id,
    5,
    'The lunch special is an amazing deal. So much variety and everything is delicious.',
    NOW() - INTERVAL '3 days'
FROM users u, food_places fp
WHERE u.name = 'Morgan Davis' AND fp.name = 'The Loop'

UNION ALL

SELECT
    u.id,
    fp.id,
    4,
    'Love the salad bar and healthy options. Great for a light lunch.',
    NOW() - INTERVAL '4 days'
FROM users u, food_places fp
WHERE u.name = 'Taylor Smith' AND fp.name = 'Farmstead';
