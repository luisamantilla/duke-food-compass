# 🍽️ Duke Food Compass

A personalized food recommendation app for Duke University students, helping them discover the best dining options on campus based on their preferences, mood, and social connections.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwind-css)

## ✨ Features

### 🏠 Home Dashboard
- Quick access to all features
- Featured recommendations
- Today's specials preview
- Friends activity feed

### 🎯 Smart Recommendations
- Multi-signal recommendation algorithm
- Weighted scoring based on:
  - User rating history (30%)
  - Tag preferences (25%)
  - Friend ratings (20%)
  - Daily specials (15%)
  - Budget constraints (10%)

### ⭐ Daily Specials
- View today's deals across campus
- Relevance-based sorting
- Price filtering
- Tag-based matching
- $5 dollar deals highlighted

### 👥 Social Features
- Friends activity feed
- See what friends are eating
- Friend rating influence on recommendations
- Social discovery of hidden gems

### 💭 Mood-Based Dining
6 mood options for instant recommendations:
- 🍕 I'm starving (all-you-can-eat, buffets)
- 🥗 Healthy & cheap (salads, vegetarian)
- 🍜 Comfort food (pizza, burgers)
- 🌶️ Try something new (international, hidden gems)
- 🌙 Late night (24hr, study spots)
- 🍰 Sweet cravings (desserts, bakeries)

### 🎨 Dining Hall Remix
Create creative meal "hacks" from dining hall stations:
- 12+ preset remixes
- 5 rule-based generation algorithms
- Combine multiple stations
- Step-by-step assembly instructions
- Zero API calls (instant results)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth + Database)
- **Icons**: Lucide React
- **State Management**: React Hooks

## Project Structure

```
duke-food-compass/
├── app/
│   ├── layout.tsx           # Root layout with NavBar
│   ├── page.tsx             # Root page (redirects to /home)
│   ├── home/                # Home dashboard page
│   ├── recommendations/     # Restaurant recommendations page
│   ├── specials/            # Daily specials page
│   ├── friends/             # Friends activity feed
│   └── mood/                # Mood-based dining page
├── components/
│   ├── NavBar.tsx           # Bottom navigation bar
│   ├── RecommendationCard.tsx
│   ├── SpecialCard.tsx
│   ├── FriendActivityCard.tsx
│   └── MoodSelector.tsx
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── database.ts          # Database helper functions
│   └── supabase/
│       ├── client.ts        # Browser Supabase client
│       ├── server.ts        # Server Supabase client
│       └── middleware.ts    # Session refresh utilities
└── middleware.ts            # Next.js middleware for auth

```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Components

### NavBar
Bottom navigation component with links to all main pages. Uses active state highlighting.

### RecommendationCard
Displays restaurant information including name, cuisine, rating, distance, and price level.

### SpecialCard
Shows special offers with discount badges, valid days, and time ranges.

### FriendActivityCard
Displays friend activity including reviews, visits, and recommendations.

### MoodSelector
Interactive mood selection interface that helps users find restaurants matching their current vibe.

## Database Schema (Supabase)

You'll need to create the following tables in Supabase:

### restaurants
```sql
- id (uuid, primary key)
- name (text)
- cuisine (text)
- distance (text)
- rating (numeric)
- price_level (integer)
- hours (text)
- image_url (text)
- description (text)
```

### specials
```sql
- id (uuid, primary key)
- restaurant_id (uuid, foreign key)
- title (text)
- description (text)
- discount (text)
- valid_days (text[])
- time_range (text)
- valid_until (date)
```

### friend_activities
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key)
- restaurant_id (uuid, foreign key)
- activity_type (text)
- rating (integer)
- comment (text)
- created_at (timestamp)
```

## Authentication

The app uses Supabase Auth with the following utilities:

- `signUp(email, password)` - Create new account
- `signIn(email, password)` - Sign in user
- `signOut()` - Sign out current user
- `getCurrentUser()` - Get authenticated user
- `getSession()` - Get current session

## Development

- The app uses Next.js 14 App Router
- All components are in the `components/` directory
- Pages use the new App Router convention in `app/` directory
- Supabase client utilities handle both client and server-side operations
- Middleware automatically refreshes user sessions

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Make sure to set the environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🚀 Quick Start

### ⚡ 5-Minute Deploy (Production)

See **[QUICKSTART.md](./QUICKSTART.md)** for step-by-step instructions.

1. Create Supabase project
2. Run migration SQL files
3. Deploy to Vercel
4. Add environment variables
5. Done! 🎉

### 💻 Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run dev server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started in 5 minutes
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[data/README.md](./data/README.md)** - Seed data documentation
- **[app/remix/README.md](./app/remix/README.md)** - Remix feature docs

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run seed             # Seed database with data

# Supabase (local development)
npm run supabase:start   # Start local Supabase
npm run supabase:stop    # Stop local Supabase
npm run supabase:status  # Check status
npm run db:reset         # Reset database with migrations
npm run db:push          # Push local migrations
```

## 📊 Sample Data

The app includes comprehensive seed data:

- **20 Food Places** (dining halls, cafes, food trucks)
- **25 Daily Specials** (including $5 deals)
- **50+ Ratings** (diverse student reviews)
- **10 Users** (fictional Duke students)
- **Friend relationships** (social graph)

## 🚢 Deployment Checklist

- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Seed data inserted
- [ ] Environment variables set in Vercel
- [ ] Vercel deployment successful
- [ ] All 6 pages load correctly
- [ ] Data displays from Supabase
- [ ] Mobile responsive tested

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Duke University Dining Services for inspiration
- Supabase for backend infrastructure
- Vercel for hosting
- Next.js team for the amazing framework

---

Built with ❤️ for Duke students

**Tech Stack:** Next.js 14 | TypeScript | Supabase | Tailwind CSS
