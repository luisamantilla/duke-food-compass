-- Duke Food Compass - Seed Data
-- Migration: 002_seed_data
-- Created: January 2025
-- Description: Populates database with 20 food places, 10 users, 25 specials, and 50+ ratings

-- ============================================
-- SEED DATA: Duke Food Places (20 locations)
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
-- SEED DATA: Sample Users (10 students)
-- ============================================
INSERT INTO users (name, email) VALUES
('Alex Johnson', 'alex.j@duke.edu'),
('Sam Patel', 'sam.p@duke.edu'),
('Jordan Lee', 'jordan.l@duke.edu'),
('Taylor Smith', 'taylor.s@duke.edu'),
('Morgan Davis', 'morgan.d@duke.edu'),
('Casey Williams', 'casey.w@duke.edu'),
('Riley Chen', 'riley.c@duke.edu'),
('Dakota Martinez', 'dakota.m@duke.edu'),
('Avery Brown', 'avery.b@duke.edu'),
('Jamie Garcia', 'jamie.g@duke.edu');

-- ============================================
-- SEED DATA: User Preferences
-- ============================================
INSERT INTO preferences (user_id, dietary, budget, dislikes, favorite_tags)
SELECT
    id,
    CASE
        WHEN name = 'Alex Johnson' THEN '["vegetarian", "gluten-free"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["vegan", "halal"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["pescatarian"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '[]'::jsonb
        WHEN name = 'Morgan Davis' THEN '["vegetarian"]'::jsonb
        WHEN name = 'Casey Williams' THEN '["vegan"]'::jsonb
        WHEN name = 'Riley Chen' THEN '[]'::jsonb
        WHEN name = 'Dakota Martinez' THEN '["gluten-free"]'::jsonb
        WHEN name = 'Avery Brown' THEN '["vegetarian"]'::jsonb
        ELSE '[]'::jsonb
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN 15
        WHEN name = 'Sam Patel' THEN 10
        WHEN name = 'Jordan Lee' THEN 20
        WHEN name = 'Taylor Smith' THEN 12
        WHEN name = 'Morgan Davis' THEN 8
        WHEN name = 'Casey Williams' THEN 18
        WHEN name = 'Riley Chen' THEN 25
        WHEN name = 'Dakota Martinez' THEN 14
        WHEN name = 'Avery Brown' THEN 10
        ELSE 15
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN '["spicy"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["dairy"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["mushrooms"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '["olives"]'::jsonb
        WHEN name = 'Morgan Davis' THEN '[]'::jsonb
        WHEN name = 'Casey Williams' THEN '["meat"]'::jsonb
        WHEN name = 'Riley Chen' THEN '[]'::jsonb
        WHEN name = 'Dakota Martinez' THEN '["gluten"]'::jsonb
        WHEN name = 'Avery Brown' THEN '["seafood"]'::jsonb
        ELSE '[]'::jsonb
    END,
    CASE
        WHEN name = 'Alex Johnson' THEN '["healthy", "salads", "organic"]'::jsonb
        WHEN name = 'Sam Patel' THEN '["indian", "asian", "curry"]'::jsonb
        WHEN name = 'Jordan Lee' THEN '["sushi", "japanese", "asian"]'::jsonb
        WHEN name = 'Taylor Smith' THEN '["pizza", "italian", "comfort-food"]'::jsonb
        WHEN name = 'Morgan Davis' THEN '["coffee", "quick"]'::jsonb
        WHEN name = 'Casey Williams' THEN '["vegan", "healthy", "organic"]'::jsonb
        WHEN name = 'Riley Chen' THEN '["asian", "noodles", "stir-fry"]'::jsonb
        WHEN name = 'Dakota Martinez' THEN '["mexican", "tacos", "burritos"]'::jsonb
        WHEN name = 'Avery Brown' THEN '["breakfast", "brunch", "coffee"]'::jsonb
        ELSE '["quick", "casual"]'::jsonb
    END
FROM users;

-- ============================================
-- SEED DATA: Specials (25 daily deals)
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
FROM food_places WHERE name = 'Farmstead'

UNION ALL

SELECT
    id,
    'Breakfast Burrito Deal',
    'Loaded breakfast burrito with hash browns',
    7.99,
    CURRENT_DATE,
    '["breakfast", "combo", "filling"]'::jsonb
FROM food_places WHERE name = 'The Skillet'

UNION ALL

SELECT
    id,
    'Stir-Fry Special',
    'Choose your protein, veggies, and sauce',
    10.99,
    CURRENT_DATE,
    '["asian", "customizable", "lunch"]'::jsonb
FROM food_places WHERE name = 'Ginger + Soy'

UNION ALL

SELECT
    id,
    'Lunch Buffet',
    'All-you-can-eat Indian cuisine buffet',
    13.99,
    CURRENT_DATE,
    '["indian", "buffet", "lunch"]'::jsonb
FROM food_places WHERE name = 'Tandoor'

UNION ALL

SELECT
    id,
    'Wing Wednesday',
    '50 cent wings with any drink purchase',
    0.50,
    CURRENT_DATE,
    '["wings", "discount", "dinner"]'::jsonb
FROM food_places WHERE name = 'The Pit'

UNION ALL

SELECT
    id,
    'Late Night Fuel',
    'Coffee + sandwich combo for studying',
    6.99,
    CURRENT_DATE,
    '["coffee", "sandwich", "study"]'::jsonb
FROM food_places WHERE name = 'Cafe'

UNION ALL

SELECT
    id,
    'Burger Combo',
    'Burger, fries, and drink',
    9.99,
    CURRENT_DATE,
    '["burgers", "combo", "lunch"]'::jsonb
FROM food_places WHERE name = 'Devil''s Krafthouse'

UNION ALL

SELECT
    id,
    'Marketplace Brunch',
    'Weekend brunch buffet with unlimited coffee',
    11.99,
    CURRENT_DATE,
    '["buffet", "brunch", "weekend"]'::jsonb
FROM food_places WHERE name = 'Marketplace'

UNION ALL

SELECT
    id,
    'Deli Sandwich Deal',
    'Any sandwich with chips and drink',
    8.99,
    CURRENT_DATE,
    '["sandwich", "combo", "lunch"]'::jsonb
FROM food_places WHERE name = 'JB''s Roasts & Chops'

UNION ALL

SELECT
    id,
    'Quick Grab Meal',
    'Pre-made sandwich, fruit, and drink',
    7.49,
    CURRENT_DATE,
    '["quick", "grab-and-go", "healthy"]'::jsonb
FROM food_places WHERE name = 'Twinnie''s To Go'

UNION ALL

SELECT
    id,
    'Study Snack Pack',
    'Coffee, muffin, and fruit',
    5.99,
    CURRENT_DATE,
    '["coffee", "snack", "study"]'::jsonb
FROM food_places WHERE name = 'The Dillo'

UNION ALL

SELECT
    id,
    'Food Truck Friday',
    'Special rotating menu item',
    8.99,
    CURRENT_DATE,
    '["special", "lunch", "outdoor"]'::jsonb
FROM food_places WHERE name = 'Blue Express'

UNION ALL

SELECT
    id,
    'Pitchfork Combo',
    'Burger or sandwich with fries',
    9.49,
    CURRENT_DATE,
    '["burgers", "combo", "outdoor"]'::jsonb
FROM food_places WHERE name = 'Pitchforks'

UNION ALL

SELECT
    id,
    'International Night',
    'Rotating global cuisine special',
    10.99,
    CURRENT_DATE,
    '["international", "buffet", "dinner"]'::jsonb
FROM food_places WHERE name = 'The Loop'

UNION ALL

SELECT
    id,
    'Date Night Special',
    'Three-course meal for two',
    45.00,
    CURRENT_DATE,
    '["fine-dining", "date", "dinner"]'::jsonb
FROM food_places WHERE name = 'Bella Union'

UNION ALL

SELECT
    id,
    'Twinnies Dinner',
    'All-you-can-eat dinner buffet',
    12.99,
    CURRENT_DATE,
    '["buffet", "dinner", "variety"]'::jsonb
FROM food_places WHERE name = 'Twinnies'

UNION ALL

SELECT
    id,
    'Value Meal Deal',
    'McChicken, fries, drink',
    5.00,
    CURRENT_DATE,
    '["fast-food", "cheap", "combo"]'::jsonb
FROM food_places WHERE name = 'McDonald''s @ WU'

UNION ALL

SELECT
    id,
    'Pizza Slice Special',
    'Two slices and a drink',
    6.99,
    CURRENT_DATE,
    '["pizza", "quick", "lunch"]'::jsonb
FROM food_places WHERE name = 'The Pit'

UNION ALL

SELECT
    id,
    'Smoothie Bowl',
    'Acai or pitaya bowl with toppings',
    8.99,
    CURRENT_DATE,
    '["healthy", "breakfast", "vegan"]'::jsonb
FROM food_places WHERE name = 'Farmstead'

UNION ALL

SELECT
    id,
    'Pasta Night',
    'Fresh pasta with choice of sauce',
    11.99,
    CURRENT_DATE,
    '["italian", "pasta", "dinner"]'::jsonb
FROM food_places WHERE name = 'Il Forno'

UNION ALL

SELECT
    id,
    'Sushi Roll Combo',
    'Three rolls of your choice',
    15.99,
    CURRENT_DATE,
    '["sushi", "combo", "dinner"]'::jsonb
FROM food_places WHERE name = 'The Gyotaku';

-- ============================================
-- SEED DATA: Ratings (50+ reviews)
-- ============================================
INSERT INTO ratings (user_id, place_id, rating, comment, created_at)
SELECT
    u.id,
    fp.id,
    4,
    'Great vegetarian options and fresh ingredients!',
    NOW() - INTERVAL '1 day'
FROM users u, food_places fp
WHERE u.name = 'Alex Johnson' AND fp.name = 'Farmstead'

UNION ALL

SELECT u.id, fp.id, 5, 'Best sushi on campus, always fresh', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'The Gyotaku'

UNION ALL

SELECT u.id, fp.id, 3, 'Good for late night studying, decent coffee', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Cafe'

UNION ALL

SELECT u.id, fp.id, 5, 'Amazing curry, authentic flavors!', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor'

UNION ALL

SELECT u.id, fp.id, 4, 'Great variety, something for everyone', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Morgan Davis' AND fp.name = 'Marketplace'

UNION ALL

SELECT u.id, fp.id, 5, 'The pasta is absolutely incredible! Best Italian food near campus.', NOW() - INTERVAL '2 hours'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Il Forno'

UNION ALL

SELECT u.id, fp.id, 4, 'Great breakfast spot. The pancakes are huge and delicious!', NOW() - INTERVAL '5 hours'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'The Skillet'

UNION ALL

SELECT u.id, fp.id, 5, 'Perfect study spot with amazing coffee and pastries.', NOW() - INTERVAL '8 hours'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'The Dillo'

UNION ALL

SELECT u.id, fp.id, 3, 'Decent quick meal, but nothing special. Good for when you''re in a rush.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Morgan Davis' AND fp.name = 'McDonald''s @ WU'

UNION ALL

SELECT u.id, fp.id, 5, 'The burritos are massive and so flavorful! Love the fresh ingredients.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Sazon'

UNION ALL

SELECT u.id, fp.id, 4, 'Really good stir fry with lots of veggie options. Quick service too.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'Ginger + Soy'

UNION ALL

SELECT u.id, fp.id, 5, 'The lunch special is an amazing deal. So much variety and everything is delicious.', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Morgan Davis' AND fp.name = 'The Loop'

UNION ALL

SELECT u.id, fp.id, 4, 'Love the salad bar and healthy options. Great for a light lunch.', NOW() - INTERVAL '4 days'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Farmstead'

UNION ALL

SELECT u.id, fp.id, 5, 'Best dining hall on campus! Always clean and great food.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Casey Williams' AND fp.name = 'Twinnies'

UNION ALL

SELECT u.id, fp.id, 4, 'Quick and convenient. Perfect between classes!', NOW() - INTERVAL '2 hours'
FROM users u, food_places fp WHERE u.name = 'Riley Chen' AND fp.name = 'Twinnie''s To Go'

UNION ALL

SELECT u.id, fp.id, 5, 'The tacos are authentic and delicious. Great portions!', NOW() - INTERVAL '3 hours'
FROM users u, food_places fp WHERE u.name = 'Dakota Martinez' AND fp.name = 'Sazon'

UNION ALL

SELECT u.id, fp.id, 4, 'Love the coffee and atmosphere. Great for group study sessions.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Avery Brown' AND fp.name = 'Cafe'

UNION ALL

SELECT u.id, fp.id, 3, 'Food is okay, can get repetitive. But it''s convenient.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Jamie Garcia' AND fp.name = 'Marketplace'

UNION ALL

SELECT u.id, fp.id, 5, 'The wings are unbeatable, especially on Wednesday!', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Riley Chen' AND fp.name = 'The Pit'

UNION ALL

SELECT u.id, fp.id, 4, 'Great pizza, reminds me of home. Love the brick oven!', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Il Forno'

UNION ALL

SELECT u.id, fp.id, 5, 'Perfect for a special occasion. Food and service are excellent!', NOW() - INTERVAL '5 days'
FROM users u, food_places fp WHERE u.name = 'Alex Johnson' AND fp.name = 'Bella Union'

UNION ALL

SELECT u.id, fp.id, 4, 'Fresh ingredients and healthy options. A bit pricey but worth it.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Casey Williams' AND fp.name = 'Farmstead'

UNION ALL

SELECT u.id, fp.id, 5, 'The breakfast burritos are incredible! So filling.', NOW() - INTERVAL '6 hours'
FROM users u, food_places fp WHERE u.name = 'Avery Brown' AND fp.name = 'The Skillet'

UNION ALL

SELECT u.id, fp.id, 3, 'It''s McDonald''s. You know what you''re getting. Convenient though.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'McDonald''s @ WU'

UNION ALL

SELECT u.id, fp.id, 4, 'Really good noodles! Love the customization options.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Riley Chen' AND fp.name = 'Ginger + Soy'

UNION ALL

SELECT u.id, fp.id, 5, 'The lunch buffet is such a good deal. I go every week!', NOW() - INTERVAL '7 days'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor'

UNION ALL

SELECT u.id, fp.id, 4, 'Great sandwiches and good coffee. Hidden gem!', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Dakota Martinez' AND fp.name = 'The Dillo'

UNION ALL

SELECT u.id, fp.id, 3, 'Decent food truck. Menu rotates which is nice.', NOW() - INTERVAL '4 days'
FROM users u, food_places fp WHERE u.name = 'Jamie Garcia' AND fp.name = 'Blue Express'

UNION ALL

SELECT u.id, fp.id, 5, 'Love eating outside! The burgers are really good.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Pitchforks'

UNION ALL

SELECT u.id, fp.id, 4, 'Solid deli sandwiches. Good portions!', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Morgan Davis' AND fp.name = 'JB''s Roasts & Chops'

UNION ALL

SELECT u.id, fp.id, 5, 'Best value on campus. The burger combo is huge!', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Casey Williams' AND fp.name = 'Devil''s Krafthouse'

UNION ALL

SELECT u.id, fp.id, 4, 'Great international options. Love trying new things here.', NOW() - INTERVAL '5 days'
FROM users u, food_places fp WHERE u.name = 'Avery Brown' AND fp.name = 'The Loop'

UNION ALL

SELECT u.id, fp.id, 5, 'The sushi is so fresh! My go-to spot.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'The Gyotaku'

UNION ALL

SELECT u.id, fp.id, 4, 'Quick grab-and-go is perfect for busy days.', NOW() - INTERVAL '12 hours'
FROM users u, food_places fp WHERE u.name = 'Riley Chen' AND fp.name = 'Twinnie''s To Go'

UNION ALL

SELECT u.id, fp.id, 3, 'It''s fine. Nothing special but gets the job done.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Jamie Garcia' AND fp.name = 'The Pit'

UNION ALL

SELECT u.id, fp.id, 5, 'The coffee keeps me alive during finals! Thank you Cafe!', NOW() - INTERVAL '3 hours'
FROM users u, food_places fp WHERE u.name = 'Alex Johnson' AND fp.name = 'Cafe'

UNION ALL

SELECT u.id, fp.id, 4, 'Love the buffet style. Can try a little of everything!', NOW() - INTERVAL '4 days'
FROM users u, food_places fp WHERE u.name = 'Dakota Martinez' AND fp.name = 'Twinnies'

UNION ALL

SELECT u.id, fp.id, 5, 'The curry is amazing! Authentic and flavorful.', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor'

UNION ALL

SELECT u.id, fp.id, 4, 'Great Italian food. The pasta is homemade!', NOW() - INTERVAL '6 days'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Il Forno'

UNION ALL

SELECT u.id, fp.id, 5, 'Perfect date night spot. Romantic and delicious!', NOW() - INTERVAL '7 days'
FROM users u, food_places fp WHERE u.name = 'Morgan Davis' AND fp.name = 'Bella Union'

UNION ALL

SELECT u.id, fp.id, 4, 'The farm-to-table concept is great. Fresh and tasty!', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Casey Williams' AND fp.name = 'Farmstead'

UNION ALL

SELECT u.id, fp.id, 3, 'Average food, but super convenient location.', NOW() - INTERVAL '5 days'
FROM users u, food_places fp WHERE u.name = 'Avery Brown' AND fp.name = 'The Dillo'

UNION ALL

SELECT u.id, fp.id, 5, 'Best tacos ever! The salsa bar is amazing.', NOW() - INTERVAL '1 day'
FROM users u, food_places fp WHERE u.name = 'Dakota Martinez' AND fp.name = 'Sazon'

UNION ALL

SELECT u.id, fp.id, 4, 'Love the stir-fry station. So many options!', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Riley Chen' AND fp.name = 'Ginger + Soy'

UNION ALL

SELECT u.id, fp.id, 5, 'The breakfast here is unbeatable. Love the pancakes!', NOW() - INTERVAL '8 hours'
FROM users u, food_places fp WHERE u.name = 'Avery Brown' AND fp.name = 'The Skillet'

UNION ALL

SELECT u.id, fp.id, 4, 'Great burgers for a food truck! Would recommend.', NOW() - INTERVAL '3 days'
FROM users u, food_places fp WHERE u.name = 'Jamie Garcia' AND fp.name = 'Pitchforks'

UNION ALL

SELECT u.id, fp.id, 5, 'Love the variety at Marketplace. Never gets old!', NOW() - INTERVAL '2 days'
FROM users u, food_places fp WHERE u.name = 'Alex Johnson' AND fp.name = 'Marketplace'

UNION ALL

SELECT u.id, fp.id, 4, 'Good sandwiches and friendly staff.', NOW() - INTERVAL '4 days'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'JB''s Roasts & Chops'

UNION ALL

SELECT u.id, fp.id, 3, 'Cheap and fast, perfect for late night cravings.', NOW() - INTERVAL '6 hours'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'McDonald''s @ WU'

UNION ALL

SELECT u.id, fp.id, 5, 'The rotating menu keeps things interesting!', NOW() - INTERVAL '5 days'
FROM users u, food_places fp WHERE u.name = 'Casey Williams' AND fp.name = 'Blue Express';

-- ============================================
-- SEED DATA: User History
-- ============================================
INSERT INTO user_history (user_id, place_id, choice_reason)
SELECT u.id, fp.id, 'Wanted something healthy and organic'
FROM users u, food_places fp WHERE u.name = 'Alex Johnson' AND fp.name = 'Farmstead'

UNION ALL

SELECT u.id, fp.id, 'Craving sushi for lunch'
FROM users u, food_places fp WHERE u.name = 'Jordan Lee' AND fp.name = 'The Gyotaku'

UNION ALL

SELECT u.id, fp.id, 'Need coffee for late night study session'
FROM users u, food_places fp WHERE u.name = 'Taylor Smith' AND fp.name = 'Cafe'

UNION ALL

SELECT u.id, fp.id, 'Meeting friends for dinner at Bella Union'
FROM users u, food_places fp WHERE u.name = 'Alex Johnson' AND fp.name = 'Bella Union'

UNION ALL

SELECT u.id, fp.id, 'Quick lunch between classes'
FROM users u, food_places fp WHERE u.name = 'Sam Patel' AND fp.name = 'Tandoor';

-- ============================================
-- SEED DATA: Friend Relationships
-- ============================================
INSERT INTO friends (user_id, friend_id, status)
SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Alex Johnson' AND u2.name IN ('Sam Patel', 'Jordan Lee', 'Taylor Smith')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Sam Patel' AND u2.name IN ('Alex Johnson', 'Morgan Davis', 'Jordan Lee')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Jordan Lee' AND u2.name IN ('Alex Johnson', 'Sam Patel', 'Taylor Smith', 'Morgan Davis')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Taylor Smith' AND u2.name IN ('Alex Johnson', 'Jordan Lee')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Morgan Davis' AND u2.name IN ('Sam Patel', 'Jordan Lee')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Casey Williams' AND u2.name IN ('Riley Chen', 'Dakota Martinez')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Riley Chen' AND u2.name IN ('Casey Williams', 'Avery Brown')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Dakota Martinez' AND u2.name IN ('Casey Williams', 'Jamie Garcia')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Avery Brown' AND u2.name IN ('Riley Chen', 'Jamie Garcia')

UNION ALL

SELECT u1.id, u2.id, 'accepted'
FROM users u1, users u2
WHERE u1.name = 'Jamie Garcia' AND u2.name IN ('Dakota Martinez', 'Avery Brown');
