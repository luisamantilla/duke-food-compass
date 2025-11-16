/**
 * Duke Food Compass - Seed Data
 *
 * This file contains realistic seed data for Duke's on-campus dining locations,
 * including places, specials, ratings, and user data.
 *
 * To use: Import and insert into Supabase database
 */

// ============================================
// USERS (Extended from original schema)
// ============================================

export const users = [
  { name: 'Alex Johnson', email: 'alex.j@duke.edu' },
  { name: 'Sam Patel', email: 'sam.p@duke.edu' },
  { name: 'Jordan Lee', email: 'jordan.l@duke.edu' },
  { name: 'Taylor Smith', email: 'taylor.s@duke.edu' },
  { name: 'Morgan Davis', email: 'morgan.d@duke.edu' },
  { name: 'Casey Martinez', email: 'casey.m@duke.edu' },
  { name: 'Riley Thompson', email: 'riley.t@duke.edu' },
  { name: 'Avery Chen', email: 'avery.c@duke.edu' },
  { name: 'Jamie Wilson', email: 'jamie.w@duke.edu' },
  { name: 'Quinn Anderson', email: 'quinn.a@duke.edu' },
]

// ============================================
// FOOD PLACES (20 Duke Locations)
// ============================================

export const foodPlaces = [
  // Dining Halls
  {
    name: "Marketplace",
    type: "dining hall",
    location: "East Campus",
    tags: ["buffet", "all-you-can-eat", "vegetarian", "vegan", "halal", "variety"],
    hours: {
      monday: "7:00 AM - 9:00 PM",
      tuesday: "7:00 AM - 9:00 PM",
      wednesday: "7:00 AM - 9:00 PM",
      thursday: "7:00 AM - 9:00 PM",
      friday: "7:00 AM - 8:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "9:00 AM - 9:00 PM"
    }
  }

  // West Union Locations
  {
    name: "Tandoor",
    type: "cafe",
    location: "West Union - Brodhead Center",
    tags: ["indian", "curry", "vegetarian", "spicy", "halal", "healthy"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "Gyotaku",
    type: "cafe",
    location: "West Union - Brodhead Center",
    tags: ["sushi", "japanese", "asian", "healthy", "seafood", "fast"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "Sazon",
    type: "cafe",
    location: "West Union - Brodhead Center",
    tags: ["mexican", "burritos", "tacos", "spicy", "vegetarian", "fast"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "Il Forno",
    type: "cafe",
    location: "West Union",
    tags: ["italian", "pizza", "pasta", "brick-oven", "savory"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "Farmstead",
    type: "cafe",
    location: "West Union - Brodhead Center",
    tags: ["farm-to-table", "healthy", "salads", "organic", "vegetarian", "vegan"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "Ginger + Soy",
    type: "cafe",
    location: "West Union",
    tags: ["asian", "stir-fry", "noodles", "fast", "healthy", "vegetarian"],
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 8:00 PM"
    }
  },
  {
    name: "The Skillet",
    type: "cafe",
    location: "West Union",
    tags: ["breakfast", "brunch", "american", "comfort-food", "savory"],
    hours: {
      monday: "7:30 AM - 2:00 PM",
      tuesday: "7:30 AM - 2:00 PM",
      wednesday: "7:30 AM - 2:00 PM",
      thursday: "7:30 AM - 2:00 PM",
      friday: "7:30 AM - 2:00 PM"
    }
  },

  // Other Campus Locations
  {
    name: "Devil's Krafthouse",
    type: "cafe",
    location: "Sanford Building",
    tags: ["burgers", "sandwiches", "comfort-food", "casual", "savory", "cheap"],
    hours: {
      monday: "11:00 AM - 8:00 PM",
      tuesday: "11:00 AM - 8:00 PM",
      wednesday: "11:00 AM - 8:00 PM",
      thursday: "11:00 AM - 8:00 PM",
      friday: "11:00 AM - 7:00 PM"
    }
  },
  {
    name: "Twinnie's",
    type: "cafe",
    location: "CIEMAS - Pratt",
    tags: ["sandwiches", "salads", "coffee", "fast", "healthy", "hidden gem"],
    hours: {
      monday: "8:00 AM - 4:00 PM",
      tuesday: "8:00 AM - 4:00 PM",
      wednesday: "8:00 AM - 4:00 PM",
      thursday: "8:00 AM - 4:00 PM",
      friday: "8:00 AM - 3:00 PM"
    }
  },
  {
    name: "Vondy",
    type: "cafe",
    location: "Perkins Library",
    tags: ["coffee", "pastries", "study-spot", "late night", "sweet", "fast"],
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
  {
    name: "Cafe",
    type: "cafe",
    location: "West Union",
    tags: ["smoothies", "healthy", "fast", "sweet", "organic", "hidden gem"],
    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 5:00 PM",
      friday: "8:00 AM - 4:00 PM"
    }
  },
  {
    name: "Gothic Grill",
    type: "cafe",
    location: "Bryan Center",
    tags: ["pizza", "grill", "comfort-food", "late night", "savory", "cheap"],
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
    name: "Pitchforks",
    type: "truck",
    location: "Plaza Drive",
    tags: ["american", "burgers", "fries", "outdoor", "fast", "savory"],
    hours: {
      monday: "11:00 AM - 3:00 PM",
      tuesday: "11:00 AM - 3:00 PM",
      wednesday: "11:00 AM - 3:00 PM",
      thursday: "11:00 AM - 3:00 PM",
      friday: "11:00 AM - 3:00 PM"
    }
  },
  {
    name: "Zweli's",
    type: "cafe",
    location: "Trent Hall - East Campus",
    tags: ["sandwiches", "wraps", "healthy", "fast", "cheap", "hidden gem"],
    hours: {
      monday: "11:00 AM - 8:00 PM",
      tuesday: "11:00 AM - 8:00 PM",
      wednesday: "11:00 AM - 8:00 PM",
      thursday: "11:00 AM - 8:00 PM",
      friday: "11:00 AM - 7:00 PM"
    }
  },
  {
    name: "Law School Cafe",
    type: "cafe",
    location: "Law School",
    tags: ["coffee", "sandwiches", "pastries", "quiet", "study-spot", "hidden gem"],
    hours: {
      monday: "7:30 AM - 5:00 PM",
      tuesday: "7:30 AM - 5:00 PM",
      wednesday: "7:30 AM - 5:00 PM",
      thursday: "7:30 AM - 5:00 PM",
      friday: "7:30 AM - 4:00 PM"
    }
  },
  {
    name: "Chef's Kitchen",
    type: "cafe",
    location: "West Union",
    tags: ["variety", "healthy", "fast", "professional", "hidden gem", "savory"],
    hours: {
      monday: "7:30 AM - 2:30 PM",
      tuesday: "7:30 AM - 2:30 PM",
      wednesday: "7:30 AM - 2:30 PM",
      thursday: "7:30 AM - 2:30 PM",
      friday: "7:30 AM - 2:00 PM"
    }
  },
  {
    name: "McDonald's @ WU",
    type: "cafe",
    location: "West Union",
    tags: ["fast-food", "burgers", "cheap", "late night", "fast", "savory"],
    hours: {
      monday: "7:00 AM - 2:00 AM",
      tuesday: "7:00 AM - 2:00 AM",
      wednesday: "7:00 AM - 2:00 AM",
      thursday: "7:00 AM - 2:00 AM",
      friday: "7:00 AM - 11:00 PM",
      saturday: "10:00 AM - 11:00 PM",
      sunday: "10:00 AM - 2:00 AM"
    }
  }
]

// ============================================
// SPECIALS (25 total, including $5 deals)
// ============================================

export const specials = [
  // $5 Dollar Deals
  {
    place_name: "Sazon",
    title: "Taco Tuesday - $5 Deal",
    description: "Two tacos with rice and beans for only $5",
    price: 5.00,
    tags: ["mexican", "discount", "lunch", "savory", "cheap"],
    day_of_week: "tuesday"
  },
  {
    place_name: "The Gyotaku",
    title: "Five Dollar Sushi Friday",
    description: "Select sushi rolls for $5 all day",
    price: 5.00,
    tags: ["sushi", "japanese", "discount", "cheap"],
    day_of_week: "friday"
  },
  {
    place_name: "Devil's Krafthouse",
    title: "Burger Monday - $5 Combo",
    description: "Classic burger with fries and drink",
    price: 5.00,
    tags: ["burgers", "american", "discount", "cheap", "savory"],
    day_of_week: "monday"
  },
  {
    place_name: "Il Forno",
    title: "Pizza Wednesday - $5 Personal",
    description: "Personal pizza with one topping",
    price: 5.00,
    tags: ["pizza", "italian", "discount", "cheap", "savory"],
    day_of_week: "wednesday"
  },
  {
    place_name: "Ginger + Soy",
    title: "Noodle Bowl Thursday - $5",
    description: "Build-your-own noodle bowl",
    price: 5.00,
    tags: ["asian", "noodles", "discount", "cheap", "healthy"],
    day_of_week: "thursday"
  },

  // Daily Limited Specials
  {
    place_name: "Tandoor",
    title: "Lunch Buffet Special",
    description: "All-you-can-eat Indian lunch buffet with 15+ dishes",
    price: 12.99,
    tags: ["indian", "buffet", "lunch", "vegetarian"],
    day_of_week: "weekdays"
  },
  {
    place_name: "The Skillet",
    title: "Early Bird Breakfast",
    description: "Pancakes, eggs, and bacon combo before 9 AM",
    price: 6.99,
    tags: ["breakfast", "american", "discount", "savory"],
    day_of_week: "weekdays"
  },
  {
    place_name: "Farmstead",
    title: "Farm Bowl Monday",
    description: "Build your own grain bowl with seasonal vegetables",
    price: 9.99,
    tags: ["healthy", "organic", "vegetarian", "vegan"],
    day_of_week: "monday"
  },
  {
    place_name: "The Pit",
    title: "Wing Wednesday",
    description: "50 cent wings all day (minimum 6)",
    price: 3.00,
    tags: ["wings", "savory", "discount", "cheap"],
    day_of_week: "wednesday"
  },
  {
    place_name: "Cafe",
    title: "Late Night Study Fuel",
    description: "Coffee and pastry combo after 10 PM",
    price: 5.50,
    tags: ["coffee", "pastries", "late night", "sweet"],
    day_of_week: "daily"
  },

  // Regular Specials
  {
    place_name: "Vondy",
    title: "Tropical Paradise Smoothie",
    description: "Mango, pineapple, and coconut smoothie with protein boost",
    price: 7.50,
    tags: ["smoothie", "healthy", "sweet", "vegan"]
  },
  {
    place_name: "The Dillo",
    title: "Engineer's Combo",
    description: "Turkey club sandwich with chips and cookie",
    price: 8.99,
    tags: ["sandwiches", "lunch", "fast"]
  },
  {
    place_name: "Law School Cafe",
    title: "Lawyer's Latte Special",
    description: "Any specialty latte with a fresh baked muffin",
    price: 6.50,
    tags: ["coffee", "pastries", "breakfast", "sweet"]
  },
  {
    place_name: "Chef's Kitchen",
    title: "Executive Lunch",
    description: "Grilled salmon with roasted vegetables and quinoa",
    price: 13.99,
    tags: ["healthy", "seafood", "professional", "savory"]
  },
  {
    place_name: "Zweli's",
    title: "East Campus Wrap",
    description: "Chicken caesar wrap with side salad",
    price: 7.99,
    tags: ["wraps", "healthy", "fast", "savory"]
  },
  {
    place_name: "Pitchforks",
    title: "Blue Devil Burger",
    description: "Double patty burger with all the fixings",
    price: 9.50,
    tags: ["burgers", "american", "savory"]
  },
  {
    place_name: "McDonald's @ WU",
    title: "Duke Night Deal",
    description: "Big Mac meal after 8 PM",
    price: 7.99,
    tags: ["fast-food", "burgers", "late night", "cheap"]
  },
  {
    place_name: "Sazon",
    title: "Burrito Bowl Supreme",
    description: "Choice of protein with all the toppings",
    price: 10.99,
    tags: ["mexican", "healthy", "savory"]
  },
  {
    place_name: "The Gyotaku",
    title: "Sushi Combo Deluxe",
    description: "California roll, spicy tuna, and miso soup",
    price: 14.99,
    tags: ["sushi", "japanese", "healthy"]
  },
  {
    place_name: "Il Forno",
    title: "Margherita Monday",
    description: "Classic margherita pizza with fresh basil",
    price: 11.99,
    tags: ["pizza", "italian", "vegetarian", "savory"],
    day_of_week: "monday"
  },
  {
    place_name: "Tandoor",
    title: "Curry Night Special",
    description: "Butter chicken with naan and rice",
    price: 11.50,
    tags: ["indian", "curry", "spicy", "savory"]
  },
  {
    place_name: "Farmstead",
    title: "Garden Fresh Salad",
    description: "Mixed greens with seasonal toppings and house dressing",
    price: 9.50,
    tags: ["salads", "healthy", "organic", "vegan"]
  },
  {
    place_name: "Ginger + Soy",
    title: "Stir Fry Special",
    description: "Choice of protein with mixed vegetables over rice",
    price: 10.50,
    tags: ["asian", "stir-fry", "healthy", "fast"]
  },
  {
    place_name: "The Pit",
    title: "Pizza & Wings Combo",
    description: "Personal pizza with 6 wings",
    price: 12.99,
    tags: ["pizza", "wings", "savory", "comfort-food"]
  },
  {
    place_name: "Devil's Krafthouse",
    title: "Blue Devil Platter",
    description: "Burger, fries, and onion rings",
    price: 11.99,
    tags: ["burgers", "american", "comfort-food", "savory"]
  }
]

// ============================================
// RATINGS (50 diverse ratings)
// ============================================

export const ratings = [
  // Marketplace ratings
  { user_email: 'alex.j@duke.edu', place_name: 'Marketplace', rating: 5, comment: 'Best variety on campus! Something for everyone.' },
  { user_email: 'sam.p@duke.edu', place_name: 'Marketplace', rating: 4, comment: 'Great vegetarian options. Can get crowded at lunch.' },
  { user_email: 'jordan.l@duke.edu', place_name: 'Marketplace', rating: 5, comment: 'All you can eat is perfect for athletes. Love the pasta bar!' },
  { user_email: 'taylor.s@duke.edu', place_name: 'Marketplace', rating: 4, comment: 'Good food but sometimes inconsistent quality.' },

  // Twinnies ratings
  { user_email: 'morgan.d@duke.edu', place_name: 'Twinnies', rating: 5, comment: 'Love the made-to-order omelets at breakfast!' },
  { user_email: 'casey.m@duke.edu', place_name: 'Twinnies', rating: 4, comment: 'Solid dining hall. Better than most college food.' },
  { user_email: 'riley.t@duke.edu', place_name: 'Twinnies', rating: 5, comment: 'The stir fry station is amazing. Fresh ingredients daily.' },

  // The Loop ratings
  { user_email: 'avery.c@duke.edu', place_name: 'The Loop', rating: 4, comment: 'Great international options. Love the Mediterranean station.' },
  { user_email: 'jamie.w@duke.edu', place_name: 'The Loop', rating: 5, comment: 'Hidden gem! Less crowded than other dining halls.' },
  { user_email: 'quinn.a@duke.edu', place_name: 'The Loop', rating: 4, comment: 'Healthy options and good for dietary restrictions.' },

  // Tandoor ratings
  { user_email: 'sam.p@duke.edu', place_name: 'Tandoor', rating: 5, comment: 'Authentic Indian food! Reminds me of home.' },
  { user_email: 'alex.j@duke.edu', place_name: 'Tandoor', rating: 5, comment: 'Best curry on campus, hands down.' },
  { user_email: 'jordan.l@duke.edu', place_name: 'Tandoor', rating: 4, comment: 'Really good but can be spicy. Great naan!' },
  { user_email: 'casey.m@duke.edu', place_name: 'Tandoor', rating: 5, comment: 'The lunch buffet is incredible value.' },

  // The Gyotaku ratings
  { user_email: 'taylor.s@duke.edu', place_name: 'The Gyotaku', rating: 5, comment: 'Best sushi near campus. Always fresh!' },
  { user_email: 'morgan.d@duke.edu', place_name: 'The Gyotaku', rating: 5, comment: 'Love the poke bowls. Healthy and delicious.' },
  { user_email: 'riley.t@duke.edu', place_name: 'The Gyotaku', rating: 4, comment: 'Great sushi but a bit pricey.' },
  { user_email: 'avery.c@duke.edu', place_name: 'The Gyotaku', rating: 5, comment: 'Friday $5 sushi rolls are the best deal!' },

  // Sazon ratings
  { user_email: 'jamie.w@duke.edu', place_name: 'Sazon', rating: 5, comment: 'Massive burritos! Can never finish one.' },
  { user_email: 'quinn.a@duke.edu', place_name: 'Sazon', rating: 4, comment: 'Good Mexican food. Taco Tuesday is a must!' },
  { user_email: 'alex.j@duke.edu', place_name: 'Sazon', rating: 5, comment: 'Fresh ingredients and generous portions.' },
  { user_email: 'jordan.l@duke.edu', place_name: 'Sazon', rating: 5, comment: 'The guac is always perfect. Worth the extra charge.' },

  // Il Forno ratings
  { user_email: 'sam.p@duke.edu', place_name: 'Il Forno', rating: 4, comment: 'Solid pizza. Good for a quick lunch between classes.' },
  { user_email: 'taylor.s@duke.edu', place_name: 'Il Forno', rating: 5, comment: 'Brick oven pizza on campus? Amazing!' },
  { user_email: 'casey.m@duke.edu', place_name: 'Il Forno', rating: 4, comment: 'Try the margherita - simple but perfect.' },

  // Farmstead ratings
  { user_email: 'morgan.d@duke.edu', place_name: 'Farmstead', rating: 5, comment: 'Perfect for healthy eating. Love the grain bowls!' },
  { user_email: 'riley.t@duke.edu', place_name: 'Farmstead', rating: 5, comment: 'Finally, good salads that actually fill you up.' },
  { user_email: 'avery.c@duke.edu', place_name: 'Farmstead', rating: 4, comment: 'Great vegan options. A bit expensive but worth it.' },
  { user_email: 'jamie.w@duke.edu', place_name: 'Farmstead', rating: 5, comment: 'Farm-to-table quality. Fresh ingredients daily.' },

  // Ginger + Soy ratings
  { user_email: 'quinn.a@duke.edu', place_name: 'Ginger + Soy', rating: 4, comment: 'Quick stir fry. Good customization options.' },
  { user_email: 'alex.j@duke.edu', place_name: 'Ginger + Soy', rating: 5, comment: 'Best noodle bowls. Always hits the spot!' },
  { user_email: 'jordan.l@duke.edu', place_name: 'Ginger + Soy', rating: 4, comment: 'Fast and tasty. Good veggie options.' },

  // The Skillet ratings
  { user_email: 'sam.p@duke.edu', place_name: 'The Skillet', rating: 5, comment: 'Best breakfast on campus! Huge pancakes.' },
  { user_email: 'taylor.s@duke.edu', place_name: 'The Skillet', rating: 5, comment: 'Early bird special is clutch before 8 AMs.' },
  { user_email: 'morgan.d@duke.edu', place_name: 'The Skillet', rating: 4, comment: 'Good classic breakfast. Can be slow during rush.' },

  // Devil's Krafthouse ratings
  { user_email: 'casey.m@duke.edu', place_name: "Devil's Krafthouse", rating: 4, comment: 'Great burgers for the price. Underrated spot.' },
  { user_email: 'riley.t@duke.edu', place_name: "Devil's Krafthouse", rating: 5, comment: 'Monday $5 burger deal is unbeatable!' },
  { user_email: 'avery.c@duke.edu', place_name: "Devil's Krafthouse", rating: 3, comment: 'Decent but nothing special. Convenient location though.' },

  // The Dillo ratings
  { user_email: 'jamie.w@duke.edu', place_name: 'The Dillo', rating: 5, comment: 'Hidden gem at Pratt! Great sandwiches.' },
  { user_email: 'quinn.a@duke.edu', place_name: 'The Dillo', rating: 4, comment: 'Perfect for quick lunch between labs.' },
  { user_email: 'alex.j@duke.edu', place_name: 'The Dillo', rating: 5, comment: 'Best kept secret on campus. Amazing coffee too!' },

  // Cafe (Perkins) ratings
  { user_email: 'jordan.l@duke.edu', place_name: 'Cafe', rating: 5, comment: 'Perfect late night study spot. Open until 2 AM!' },
  { user_email: 'sam.p@duke.edu', place_name: 'Cafe', rating: 4, comment: 'Great coffee. Pastries are hit or miss.' },
  { user_email: 'taylor.s@duke.edu', place_name: 'Cafe', rating: 5, comment: 'Lifesaver during finals. Good food + late hours.' },

  // Vondy ratings
  { user_email: 'morgan.d@duke.edu', place_name: 'Vondy', rating: 5, comment: 'Best smoothies on campus! Fresh fruit daily.' },
  { user_email: 'casey.m@duke.edu', place_name: 'Vondy', rating: 5, comment: 'Healthy and delicious. Protein bowls are amazing.' },
  { user_email: 'riley.t@duke.edu', place_name: 'Vondy', rating: 4, comment: 'A bit pricey but quality is great.' },

  // The Pit ratings
  { user_email: 'avery.c@duke.edu', place_name: 'The Pit', rating: 4, comment: 'Wing Wednesday is legendary. Get there early!' },
  { user_email: 'jamie.w@duke.edu', place_name: 'The Pit', rating: 3, comment: 'Decent late night option. Pizza is okay.' },
  { user_email: 'quinn.a@duke.edu', place_name: 'The Pit', rating: 4, comment: 'Good for watching games. Fun atmosphere.' },

  // Pitchforks ratings
  { user_email: 'alex.j@duke.edu', place_name: 'Pitchforks', rating: 4, comment: 'Classic food truck burgers. Great when weather is nice!' },
  { user_email: 'jordan.l@duke.edu', place_name: 'Pitchforks', rating: 3, comment: 'Good but limited hours. Wish they were open later.' }
]

// ============================================
// EXPORT HELPER FUNCTION
// ============================================

/**
 * Formats seed data for Supabase insertion
 *
 * Usage:
 * const { formattedPlaces, formattedSpecials, formattedRatings } = formatSeedData()
 */
export function formatSeedData() {
  return {
    users,
    formattedPlaces: foodPlaces.map(place => ({
      ...place,
      tags: JSON.stringify(place.tags),
      hours: JSON.stringify(place.hours)
    })),
    formattedSpecials: specials,
    formattedRatings: ratings
  }
}

/**
 * SQL INSERT statements for direct database insertion
 */
export function generateInsertStatements() {
  const placeInserts = foodPlaces.map(place => `
    INSERT INTO food_places (name, type, location, tags, hours)
    VALUES (
      '${place.name.replace(/'/g, "''")}',
      '${place.type}',
      '${place.location}',
      '${JSON.stringify(place.tags)}'::jsonb,
      '${JSON.stringify(place.hours)}'::jsonb
    );
  `).join('\n')

  const specialInserts = specials.map(special => `
    INSERT INTO specials (place_id, title, description, price, date, tags)
    SELECT
      fp.id,
      '${special.title.replace(/'/g, "''")}',
      '${special.description.replace(/'/g, "''")}',
      ${special.price},
      CURRENT_DATE${special.day_of_week === 'monday' ? " + INTERVAL '1 day' * (8 - EXTRACT(DOW FROM CURRENT_DATE))" : ''},
      '${JSON.stringify(special.tags)}'::jsonb
    FROM food_places fp
    WHERE fp.name = '${special.place_name.replace(/'/g, "''")}';
  `).join('\n')

  const ratingInserts = ratings.map(rating => `
    INSERT INTO ratings (user_id, place_id, rating, comment, created_at)
    SELECT
      u.id,
      fp.id,
      ${rating.rating},
      '${rating.comment.replace(/'/g, "''")}',
      NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days'
    FROM users u, food_places fp
    WHERE u.email = '${rating.user_email}'
      AND fp.name = '${rating.place_name.replace(/'/g, "''")}';
  `).join('\n')

  return `
-- ============================================
-- Duke Food Compass - Seed Data SQL
-- ============================================

${placeInserts}

${specialInserts}

${ratingInserts}
  `
}

// ============================================
// QUICK STATS
// ============================================

export const stats = {
  totalPlaces: foodPlaces.length,
  totalSpecials: specials.length,
  totalRatings: ratings.length,
  dollarDeals: specials.filter(s => s.price === 5.00).length,
  diningHalls: foodPlaces.filter(p => p.type === 'dining hall').length,
  cafes: foodPlaces.filter(p => p.type === 'cafe').length,
  foodTrucks: foodPlaces.filter(p => p.type === 'truck').length
}

console.log('Seed Data Stats:', stats)
