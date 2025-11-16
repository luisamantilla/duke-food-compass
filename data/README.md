# Duke Food Compass - Seed Data

Comprehensive seed data for Duke University's on-campus dining locations.

## Contents

- **20 Food Places** - Realistic Duke dining locations
- **25 Specials** - Including $5 deals and daily specials
- **50 Ratings** - Diverse student reviews
- **10 Users** - Fictional Duke students

## Quick Stats

```typescript
{
  totalPlaces: 20,
  totalSpecials: 25,
  totalRatings: 50,
  dollarDeals: 5,
  diningHalls: 3,
  cafes: 16,
  foodTrucks: 1
}
```

## Food Places Breakdown

### Dining Halls (3)
1. **Marketplace** - East Campus
2. **Twinnies** - West Campus
3. **The Loop** - Central Campus

### West Union / Brodhead Center (7)
4. **Tandoor** - Indian cuisine
5. **The Gyotaku** - Sushi & Japanese
6. **Sazon** - Mexican food
7. **Il Forno** - Brick-oven pizza & Italian
8. **Farmstead** - Farm-to-table, healthy
9. **Ginger + Soy** - Asian stir-fry
10. **The Skillet** - Breakfast & brunch

### Other Campus Locations (9)
11. **Devil's Krafthouse** - Sanford Building
12. **The Dillo** - CIEMAS (Pratt)
13. **Cafe** - Perkins Library (late night)
14. **Vondy** - Bryan Center (smoothies)
15. **The Pit** - Bryan Center (pizza, wings)
16. **Pitchforks** - Food truck
17. **Zweli's** - Trent Hall (East Campus)
18. **Law School Cafe** - Law School
19. **Chef's Kitchen** - Fuqua Business School
20. **McDonald's @ WU** - West Union

## Special Deals

### $5 Dollar Deals (5)
- **Monday**: Devil's Krafthouse - Burger combo
- **Tuesday**: Sazon - Two tacos with rice & beans
- **Wednesday**: Il Forno - Personal pizza
- **Thursday**: Ginger + Soy - Noodle bowl
- **Friday**: The Gyotaku - Select sushi rolls

### Daily Limited Specials (5)
- **Tandoor** - Lunch buffet (weekdays)
- **The Skillet** - Early bird breakfast
- **The Pit** - Wing Wednesday (50¢ wings)
- **Cafe** - Late night study fuel
- **Farmstead** - Farm Bowl Monday

### Regular Specials (15)
Various ongoing deals at all locations

## Common Tags

```typescript
[
  "cheap",         // Budget-friendly options
  "fast",          // Quick service
  "sweet",         // Desserts, pastries
  "savory",        // Main meals
  "healthy",       // Nutritious options
  "late night",    // Open late
  "hidden gem",    // Lesser-known spots
  "vegetarian",    // Veggie options
  "vegan",         // Plant-based
  "spicy",         // Spicy food
  "comfort-food",  // Classic favorites
  "study-spot"     // Good for studying
]
```

## Usage

### Option 1: Import TypeScript Data

```typescript
import {
  users,
  foodPlaces,
  specials,
  ratings,
  formatSeedData
} from '@/data/seed'

// Use formatted data for Supabase
const { formattedPlaces, formattedSpecials, formattedRatings } = formatSeedData()
```

### Option 2: Generate SQL Statements

```typescript
import { generateInsertStatements } from '@/data/seed'

const sql = generateInsertStatements()
console.log(sql)
// Copy output and run in Supabase SQL editor
```

### Option 3: Manual SQL Insertion

1. Open Supabase SQL Editor
2. Run the generated INSERT statements
3. Verify data insertion with:
   ```sql
   SELECT COUNT(*) FROM food_places;
   SELECT COUNT(*) FROM specials;
   SELECT COUNT(*) FROM ratings;
   ```

## Data Structure

### Food Place Object
```typescript
{
  name: string
  type: "dining hall" | "cafe" | "truck"
  location: string
  tags: string[]
  hours: {
    monday?: string
    tuesday?: string
    // ...
  }
}
```

### Special Object
```typescript
{
  place_name: string
  title: string
  description: string
  price: number
  tags: string[]
  day_of_week?: string  // Optional: for recurring specials
}
```

### Rating Object
```typescript
{
  user_email: string
  place_name: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
}
```

## Tag Distribution

### By Category
- **Price**: cheap (8 places)
- **Speed**: fast (12 places)
- **Health**: healthy (10 places), vegetarian (9 places), vegan (4 places)
- **Time**: late night (3 places)
- **Discovery**: hidden gem (6 places)
- **Food Type**: savory (14 places), sweet (4 places)

### Most Tagged Places
1. **Marketplace** - 6 tags (buffet, all-you-can-eat, vegetarian, vegan, halal, variety)
2. **Twinnies** - 6 tags (buffet, all-you-can-eat, vegetarian, vegan, gluten-free, variety)
3. **Farmstead** - 6 tags (farm-to-table, healthy, salads, organic, vegetarian, vegan)

## Sample Queries

### Get all $5 deals
```typescript
const dollarDeals = specials.filter(s => s.price === 5.00)
```

### Get late night options
```typescript
const lateNightPlaces = foodPlaces.filter(p =>
  p.tags.includes('late night')
)
// Returns: Cafe, The Pit, McDonald's @ WU
```

### Get hidden gems
```typescript
const hiddenGems = foodPlaces.filter(p =>
  p.tags.includes('hidden gem')
)
// Returns: Vondy, The Dillo, Zweli's, Law School Cafe, Chef's Kitchen
```

### Get all vegetarian-friendly places
```typescript
const veggieSpots = foodPlaces.filter(p =>
  p.tags.includes('vegetarian') || p.tags.includes('vegan')
)
// Returns: 10 places
```

### Get highly rated places (4+ stars)
```typescript
const highlyRated = ratings
  .reduce((acc, r) => {
    if (!acc[r.place_name]) acc[r.place_name] = []
    acc[r.place_name].push(r.rating)
    return acc
  }, {})

Object.entries(highlyRated)
  .filter(([_, ratings]) => {
    const avg = ratings.reduce((a, b) => a + b) / ratings.length
    return avg >= 4
  })
```

## Realistic Duke Details

### Operating Hours
- **Dining Halls**: 7 AM - 9 PM (shorter on weekends)
- **Cafes**: Varies (7:30 AM - 2 PM to 11 AM - 9 PM)
- **Late Night**: Cafe (until 2 AM), McDonald's (until 2 AM)
- **Limited Hours**: The Skillet (breakfast only), Pitchforks (lunch only)

### Pricing
- **Cheap**: $5-7 (dollar deals, McDonald's)
- **Moderate**: $8-11 (most cafes)
- **Premium**: $12-15 (Tandoor buffet, sushi combos, Chef's Kitchen)

### Locations
- **East Campus**: Marketplace, Zweli's
- **West Campus**: Twinnies, West Union complex (8 locations)
- **Central Campus**: The Loop, Bryan Center (Vondy, The Pit)
- **Professional Schools**: Law School Cafe, Chef's Kitchen (Fuqua), The Dillo (Pratt)

### Special Days
- **Monday**: $5 burgers (Krafthouse), Pizza special (Il Forno), Farm Bowl (Farmstead)
- **Tuesday**: $5 tacos (Sazon)
- **Wednesday**: $5 pizza (Il Forno), Wing Wednesday (The Pit)
- **Thursday**: $5 noodle bowl (Ginger + Soy)
- **Friday**: $5 sushi (The Gyotaku)

## Testing Recommendations

### Test User Preferences
1. **Health-conscious**: Should match Farmstead, Vondy, The Gyotaku
2. **Budget-focused**: Should match $5 deals, cheap tags
3. **Late-night studier**: Should match Cafe, The Pit, McDonald's
4. **Foodie explorer**: Should match Tandoor, Sazon, hidden gems

### Test Mood Matching
- **"I'm starving"**: Marketplace, Twinnies (all-you-can-eat)
- **"Healthy & cheap"**: Farmstead, Zweli's, The Dillo
- **"Comfort food"**: The Pit, Devil's Krafthouse, Il Forno
- **"Try something new"**: Tandoor, The Gyotaku, Sazon
- **"Late night"**: Cafe, McDonald's @ WU
- **"Sweet cravings"**: Cafe, Law School Cafe, Vondy

### Test Special Recommendations
Each day should surface that day's $5 deal as a top recommendation.

## Updating Data

### Add New Place
```typescript
foodPlaces.push({
  name: "New Place",
  type: "cafe",
  location: "Campus Location",
  tags: ["tag1", "tag2"],
  hours: { monday: "9:00 AM - 5:00 PM" }
})
```

### Add New Special
```typescript
specials.push({
  place_name: "Existing Place",
  title: "New Special",
  description: "Description here",
  price: 9.99,
  tags: ["tag1", "tag2"]
})
```

### Add New Rating
```typescript
ratings.push({
  user_email: "existing@duke.edu",
  place_name: "Existing Place",
  rating: 5,
  comment: "Great experience!"
})
```

## Future Enhancements

- [ ] Add nutritional information
- [ ] Include allergen warnings
- [ ] Add photo URLs
- [ ] Include wait time estimates
- [ ] Add seasonal menu items
- [ ] Include Duke meal plan acceptance
- [ ] Add delivery availability
- [ ] Include sustainability ratings
