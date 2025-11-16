# Dining Hall Remix - Documentation

## Overview

The Dining Hall Remix feature helps students create creative meal "hacks" by combining different stations and ingredients available at Duke dining halls. It uses **rule-based generation** (no LLM calls) to provide instant, creative meal ideas.

## Features

### 🍽️ Four Dining Halls
- **Marketplace** - Grill, Pizza, Salad Bar, Asian Station, Pasta Bar, Dessert
- **Pitchforks** - Burgers, Fries, Sandwiches, Salad Bar, Grill
- **West Union** - Il Forno Pizza, Ginger + Soy, The Skillet, McDonald's, Coffee Bar
- **Trinity Café** - Sandwiches, Soup, Salad Bar, Bakery, Coffee

### 🎨 Interactive Selection
- **Dining Hall Dropdown** - Choose your location
- **Station Checkboxes** - Select available stations (minimum 1)
- **Add-on Checkboxes** - Optional condiments and extras
- **Generate Button** - Creates 3 meal hacks instantly

### 📋 Output Format
Each meal hack includes:
- **Title** - Creative name for the hack
- **Ingredients** - List of what you need
- **Assembly Steps** - Numbered instructions
- **Why It Works** - Explanation of the combination
- **Tags** - Stations and add-ons used

## File Structure

```
app/remix/
├── page.tsx                     # Remix page layout
└── README.md                    # This documentation

components/
└── DiningHallRemix.tsx          # Main component

lib/data/
└── remixes.json                 # Preset remixes + dining hall data
```

## Data Structure

### Dining Hall Object
```json
{
  "id": "marketplace",
  "name": "Marketplace",
  "stations": ["Grill", "Pizza", "Salad Bar", "Asian Station", "Pasta Bar", "Dessert"],
  "addons": ["Fresh Fruit", "Hot Sauce", "Ranch", "Honey", "Peanut Butter", "Chocolate Chips"]
}
```

### Preset Remix Object
```json
{
  "id": "1",
  "diningHall": "marketplace",
  "title": "The Breakfast Pizza",
  "stations": ["Pizza", "Grill"],
  "addons": ["Ranch", "Hot Sauce"],
  "ingredients": [
    "1 slice cheese pizza",
    "2 scrambled eggs from grill",
    "Bacon bits",
    "Hot sauce",
    "Ranch drizzle"
  ],
  "steps": [
    "Get a fresh slice of cheese pizza from the pizza station",
    "Top with scrambled eggs from the grill station",
    "Add crispy bacon bits",
    "Drizzle with ranch and hot sauce",
    "Fold in half like a taco if you're brave"
  ],
  "whyItWorks": "The warm pizza crust acts as the perfect base for breakfast toppings..."
}
```

## Rule-Based Generation Logic

The system uses 5 rules to generate meal hacks:

### Rule 1: Pizza Fusion
**Trigger:** Pizza station + any other station

**Output:** `The {OtherStation} Pizza Remix`

**Logic:**
```typescript
if (stations.includes('Pizza') && stations.length > 1) {
  // Use pizza as base, add toppings from other station
}
```

**Example:**
- Pizza + Asian Station → "The Asian Station Pizza Remix"
- Ingredients: Pizza slice + stir-fry toppings

### Rule 2: Power Bowl
**Trigger:** Salad Bar + (Grill OR Burgers)

**Output:** `The Power Bowl`

**Logic:**
```typescript
if ((stations.includes('Salad Bar') && stations.includes('Grill')) ||
    (stations.includes('Salad Bar') && stations.includes('Burgers'))) {
  // Create loaded salad bowl with hot protein
}
```

**Example:**
- Ingredients: Mixed greens + grilled protein + vegetables + cheese

### Rule 3: Asian Fusion Bowl
**Trigger:** Any station with "Asian" or "Ginger" in name

**Output:** `DIY Fusion Bowl`

**Logic:**
```typescript
if (stations.some(s => s.includes('Asian') || s.includes('Ginger'))) {
  // Create Asian-style bowl with fresh add-ons
}
```

**Example:**
- Ingredients: Rice/noodles + stir-fry + fresh vegetables

### Rule 4: Sweet Remix
**Trigger:** (Dessert OR Bakery) + any other station

**Output:** `Sweet {OtherStation} Surprise`

**Logic:**
```typescript
if (stations.includes('Dessert') || stations.includes('Bakery')) {
  // Turn savory items into dessert
}
```

**Example:**
- Pasta + Dessert → Sweet pasta with chocolate and ice cream

### Rule 5: Simple Enhancement
**Trigger:** 1 station + add-ons

**Output:** `Enhanced {Station}`

**Logic:**
```typescript
if (stations.length === 1 && addons.length > 0) {
  // Elevate single station with condiments
}
```

**Example:**
- Pizza + Hot Sauce + Ranch → Enhanced Pizza

## Preset Remixes (12 Total)

### Marketplace (3)
1. **The Breakfast Pizza** - Pizza + Grill
2. **Asian Fusion Bowl** - Asian Station + Salad Bar
3. **Dessert Pasta** - Pasta Bar + Dessert

### Pitchforks (2)
4. **Loaded Fry Burger Bowl** - Burgers + Fries
5. **The Grilled Cheese Burger** - Burgers + Grill

### West Union (3)
6. **Pizza Egg Roll Fusion** - Il Forno + Ginger + Soy
7. **Breakfast Skillet Sandwich** - The Skillet + McDonald's
8. **The Coffee Shop Shake** - Coffee Bar + McDonald's

### Trinity Café (3)
9. **The Ultimate Avocado Toast** - Sandwiches + Salad Bar + Bakery
10. **Grilled Cheese Tomato Soup Dippers** - Sandwiches + Soup
11. **Bakery Parfait** - Bakery + Salad Bar

### Multi-Hall (1)
12. **The Mediterranean Flatbread** - Pizza + Salad Bar

## Generation Flow

```
User selects:
├─ Dining Hall: "Marketplace"
├─ Stations: ["Pizza", "Asian Station"]
└─ Add-ons: ["Soy Sauce", "Hot Sauce"]
        ↓
System checks:
├─ Preset remixes for Marketplace
├─ Filters by selected stations
└─ Applies rule-based generation
        ↓
Combines results:
├─ Preset: "Asian Fusion Bowl" (matches)
├─ Generated: "The Asian Station Pizza Remix" (Rule 1)
└─ Generated: "DIY Fusion Bowl" (Rule 3)
        ↓
Returns top 3 remixes
```

## Component API

### DiningHallRemix

**State:**
```typescript
const [selectedHall, setSelectedHall] = useState<string>('')
const [selectedStations, setSelectedStations] = useState<string[]>([])
const [selectedAddons, setSelectedAddons] = useState<string[]>([])
const [remixes, setRemixes] = useState<RemixIdea[]>([])
const [showResults, setShowResults] = useState(false)
```

**Key Functions:**
```typescript
handleStationToggle(station: string)  // Toggle station selection
handleAddonToggle(addon: string)      // Toggle addon selection
generateRemixes()                      // Generate 3 meal hacks
reset()                                // Start over
```

## Usage Example

### Basic Flow

1. **Select Marketplace**
2. **Check "Pizza" and "Salad Bar"**
3. **Check "Ranch" and "Hot Sauce"**
4. **Click "Generate Meal Hacks"**

**Result:**
```
Hack #1: The Salad Bar Pizza Remix
- Pizza slice topped with fresh vegetables and ranch

Hack #2: The Mediterranean Flatbread  (Preset)
- Flatbread with hummus, cucumbers, tomatoes, feta

Hack #3: Enhanced Pizza  (Rule 5)
- Pizza with ranch and hot sauce drizzle
```

## Customization

### Adding New Dining Halls

Edit `lib/data/remixes.json`:

```json
{
  "id": "new-hall",
  "name": "New Dining Hall",
  "stations": ["Station 1", "Station 2", "Station 3"],
  "addons": ["Addon 1", "Addon 2", "Addon 3"]
}
```

### Adding New Preset Remixes

Add to `presetRemixes` array in `remixes.json`:

```json
{
  "id": "13",
  "diningHall": "marketplace",
  "title": "Your New Hack",
  "stations": ["Station 1", "Station 2"],
  "addons": ["Addon 1"],
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "steps": ["Step 1", "Step 2"],
  "whyItWorks": "Explanation here"
}
```

### Adding New Generation Rules

Edit `generateRuleBasedRemixes()` in `DiningHallRemix.tsx`:

```typescript
// Rule 6: Your custom rule
if (yourCondition) {
  remixes.push({
    title: "Your Generated Title",
    stations: yourStations,
    addons: yourAddons,
    ingredients: [...],
    steps: [...],
    whyItWorks: "Your explanation"
  })
}
```

## UI Components

### Selection Interface
- **Dropdown** - Dining hall selection (1 required)
- **Station Grid** - 2-3 columns, orange highlight when selected
- **Addon Grid** - 2-3 columns, green highlight when selected
- **Generate Button** - Orange-red gradient, disabled until valid selection

### Results Display
- **Header Card** - Title, "Try Again" button
- **Remix Cards** - Orange gradient header with hack number
  - Numbered ingredients list
  - Step-by-step assembly instructions
  - "Why It Works" explanation in green box
  - Station and addon tags

### Styling
- **Primary Colors:** Orange (#F97316), Red (#DC2626)
- **Accent Colors:** Green (#10B981), Blue (#3B82F6)
- **Borders:** Rounded-xl (12px)
- **Shadows:** Smooth hover effects
- **Responsive:** 2-column grid on mobile, 3-column on desktop

## Performance

- **Zero API calls** - All generation is client-side
- **Instant results** - Rule-based logic executes in <10ms
- **Small data file** - remixes.json is ~25KB
- **No dependencies** - Pure TypeScript/React logic

## Testing

### Test Case 1: Single Station
```
Input: Marketplace, Pizza only, No add-ons
Expected: 1 preset remix OR 1 generated "Enhanced Pizza"
```

### Test Case 2: Two Stations
```
Input: Marketplace, Pizza + Asian Station, Soy Sauce
Expected: 3 remixes including "The Asian Station Pizza Remix"
```

### Test Case 3: Multiple Stations
```
Input: West Union, Il Forno + Ginger + Soy + Coffee Bar, All add-ons
Expected: 3 creative fusion remixes
```

### Test Case 4: Reset Flow
```
1. Generate remixes
2. Click "Try Again"
Expected: Return to selection screen, all selections cleared
```

## Future Enhancements

- [ ] Save favorite hacks to profile
- [ ] Share hacks with friends
- [ ] Rate community-submitted hacks
- [ ] Filter by dietary restrictions
- [ ] Photo upload for user hacks
- [ ] Seasonal/limited-time hacks
- [ ] Difficulty ratings (easy/medium/advanced)
- [ ] Nutrition information estimates
- [ ] Print-friendly hack cards
- [ ] QR codes for quick access at dining halls

## Troubleshooting

**No remixes generated:**
- Ensure at least one station is selected
- Check that dining hall is selected
- Try different station combinations

**Same remixes every time:**
- Preset remixes are deterministic
- Try different station combinations for variety
- Add-ons create variations in generated hacks

**Remixes don't make sense:**
- Some combinations may seem unusual by design
- Check the "Why It Works" section for explanation
- Rule-based generation prioritizes creativity over convention

## Related Files

- `/components/MoodSelector.tsx` - Similar selection UI pattern
- `/lib/recommender.ts` - Recommendation scoring (different approach)
- `/app/specials/page.tsx` - Another feature with suggestions
