# Duke Food Compass - Deployment Guide

Complete guide for deploying Duke Food Compass to production and setting up local development.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [Local Development](#local-development)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** installed
- **Vercel CLI** (optional): `npm i -g vercel`
- **Supabase CLI** (for local dev): `npm i -g supabase`
- **Vercel Account**: [vercel.com](https://vercel.com)
- **Supabase Account**: [supabase.com](https://supabase.com)

---

## Supabase Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `duke-food-compass`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
4. Click **"Create new project"**
5. Wait 2-3 minutes for project initialization

### 2. Get Your Supabase Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (⚠️ Keep secret! For admin operations only)

3. Go to **Settings** → **Database**
4. Copy the **Connection String** (for direct database access if needed)

---

## Environment Variables

### 1. Create `.env.local` for Local Development

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key for seed scripts (NEVER expose to client!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Database URL for migrations
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

### 2. Configure Vercel Environment Variables

You'll set these in Vercel dashboard (see [Vercel Deployment](#vercel-deployment) section).

**Required variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

⚠️ **Security Note**: Never commit `.env.local` to git! It's already in `.gitignore`.

---

## Database Setup

### Option 1: Quick Setup via Supabase Dashboard (Recommended)

1. Open Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **"Run"** (▶️ button)
6. Verify tables created: Go to **Table Editor** → You should see 7 tables

### Option 2: Using Supabase CLI (Advanced)

```bash
# Link your local project to Supabase
supabase link --project-ref your-project-ref

# Push migrations to Supabase
supabase db push

# Verify migration
supabase db remote list
```

### Seed the Database

After creating tables, insert seed data:

#### Method 1: Run Node Script (Recommended)

```bash
# Install dependencies
npm install

# Run seed script
npm run seed
```

#### Method 2: SQL Editor

1. Copy contents of `supabase/migrations/002_seed_data.sql`
2. Paste into Supabase SQL Editor
3. Run the query

#### Method 3: Manual TypeScript Seed

```bash
# Run the TypeScript seed script directly
npx tsx scripts/seed-database.ts
```

### Verify Data Insertion

```sql
-- Run in Supabase SQL Editor
SELECT COUNT(*) as count, 'users' as table_name FROM users
UNION ALL
SELECT COUNT(*), 'food_places' FROM food_places
UNION ALL
SELECT COUNT(*), 'specials' FROM specials
UNION ALL
SELECT COUNT(*), 'ratings' FROM ratings;
```

Expected counts:
- **users**: 10
- **food_places**: 20
- **specials**: 25
- **ratings**: 50

---

## Vercel Deployment

### Quick Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/duke-food-compass)

### Manual Deployment

#### 1. Install Vercel CLI (Optional)

```bash
npm i -g vercel
```

#### 2. Deploy from Command Line

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? duke-food-compass
# - Directory? ./
# - Override settings? No
```

#### 3. Or Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository (GitHub/GitLab/Bitbucket)
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Add environment variables (see below)
5. Click **"Deploy"**

#### 4. Add Environment Variables in Vercel

1. Go to your project → **Settings** → **Environment Variables**
2. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | Production, Preview, Development |

3. Click **"Save"**
4. Redeploy: **Deployments** → **⋯** → **Redeploy**

---

## Local Development

### Option 1: Use Hosted Supabase (Easiest)

```bash
# 1. Clone repository
git clone https://github.com/your-username/duke-food-compass.git
cd duke-food-compass

# 2. Install dependencies
npm install

# 3. Create .env.local (see Environment Variables section)
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

### Option 2: Use Supabase Local Emulator (Advanced)

For completely local development without internet:

#### 1. Install Docker Desktop

- **Mac**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Windows**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: Install via package manager

#### 2. Initialize Supabase Locally

```bash
# Start Supabase services (PostgreSQL, Auth, Storage, etc.)
supabase start

# Output will show:
# - API URL: http://localhost:54321
# - DB URL: postgresql://postgres:postgres@localhost:54322/postgres
# - Studio URL: http://localhost:54323
# - anon key: eyJh... (for NEXT_PUBLIC_SUPABASE_ANON_KEY)
# - service_role key: eyJh... (for admin operations)
```

#### 3. Configure Local Environment

Create `.env.local`:

```bash
# Local Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-start>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-from-supabase-start>
```

#### 4. Apply Migrations

```bash
# Reset and apply all migrations
supabase db reset

# Or apply migrations manually
supabase db push
```

#### 5. Seed Local Database

```bash
# Run seed script
npm run seed
```

#### 6. Access Supabase Studio

Open [http://localhost:54323](http://localhost:54323) to access local Supabase dashboard.

#### 7. Stop Supabase

```bash
# Stop all services
supabase stop

# Stop and remove all data (fresh start)
supabase stop --no-backup
```

---

## Package Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "tsx scripts/seed-database.ts",
    "db:reset": "supabase db reset",
    "db:push": "supabase db push",
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop"
  }
}
```

Install `tsx` for running TypeScript scripts:

```bash
npm install -D tsx
```

---

## Testing Your Deployment

### 1. Test Basic Functionality

- ✅ Homepage loads
- ✅ Navigation works (all 6 pages)
- ✅ Specials page shows data from Supabase
- ✅ Friends page displays (even if empty)
- ✅ Mood selector works
- ✅ Remix generator creates meal hacks

### 2. Test Supabase Connection

```bash
# Test query in browser console (F12)
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const { data, error } = await supabase.from('food_places').select('*')
console.log(data) // Should show 20 food places
```

### 3. Check Vercel Logs

```bash
# Via CLI
vercel logs

# Or via Dashboard
# Project → Deployments → [Latest] → Function Logs
```

---

## Troubleshooting

### Issue: "Invalid API Key" Error

**Cause**: Wrong Supabase credentials

**Fix**:
1. Verify `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Check Supabase Dashboard → Settings → API
3. Restart dev server: `npm run dev`

### Issue: "Table does not exist" Error

**Cause**: Database schema not created

**Fix**:
1. Run migration: `supabase/migrations/001_initial_schema.sql` in SQL Editor
2. Or use CLI: `supabase db push`

### Issue: Pages Show Empty Data

**Cause**: Database not seeded

**Fix**:
1. Run seed script: `npm run seed`
2. Or manually run `002_seed_data.sql` in SQL Editor
3. Verify with: `SELECT COUNT(*) FROM food_places;`

### Issue: Vercel Build Fails

**Cause**: Missing environment variables or build errors

**Fix**:
1. Check Vercel build logs for specific error
2. Verify all environment variables are set in Vercel dashboard
3. Test build locally: `npm run build`
4. Check for TypeScript errors: `npm run lint`

### Issue: "Cannot connect to Supabase" in Production

**Cause**: Environment variables not set in Vercel

**Fix**:
1. Go to Vercel → Settings → Environment Variables
2. Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Redeploy: Deployments → ⋯ → Redeploy

### Issue: Local Supabase Won't Start

**Cause**: Docker not running or port conflicts

**Fix**:
1. Ensure Docker Desktop is running
2. Check ports 54321-54323 aren't in use: `lsof -i :54321`
3. Stop other services using those ports
4. Try: `supabase stop --no-backup && supabase start`

### Issue: Seed Script Fails

**Cause**: Missing service role key or table structure mismatch

**Fix**:
1. Ensure `SUPABASE_SERVICE_ROLE_KEY` is in `.env.local`
2. Run migrations first: `supabase db push`
3. Check script output for specific errors
4. Manually run SQL if needed: `002_seed_data.sql`

---

## Production Checklist

Before going live:

- [ ] Database schema created (7 tables)
- [ ] Seed data inserted (20 places, 25 specials, 50 ratings, 10 users)
- [ ] Environment variables set in Vercel
- [ ] Test all 6 pages in production
- [ ] Verify Supabase Row Level Security (RLS) policies (optional)
- [ ] Set up custom domain in Vercel (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Test on mobile and desktop browsers
- [ ] Check performance with Lighthouse
- [ ] Set up error monitoring (e.g., Sentry) (optional)

---

## Next Steps

### Optional Enhancements

1. **Authentication**
   - Enable Supabase Auth (Email, OAuth, Magic Links)
   - Implement user login/signup
   - Add protected routes

2. **Row Level Security (RLS)**
   - Enable RLS on tables
   - Create policies for user data access
   - Secure ratings and preferences

3. **Custom Domain**
   - Add custom domain in Vercel
   - Set up SSL (automatic with Vercel)
   - Configure DNS records

4. **Monitoring**
   - Set up Vercel Analytics
   - Add error tracking (Sentry, LogRocket)
   - Monitor API usage in Supabase

5. **Performance**
   - Enable Vercel Edge Functions
   - Set up CDN caching
   - Optimize images with Next.js Image component

---

## Support

- **Vercel Docs**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

## Quick Command Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npm run seed                   # Seed database
supabase db reset              # Reset local database
supabase db push               # Push migrations

# Deployment
vercel                         # Deploy to preview
vercel --prod                  # Deploy to production
vercel logs                    # View logs

# Local Supabase
supabase start                 # Start local instance
supabase stop                  # Stop local instance
supabase status                # Check status
```

---

**Last Updated**: January 2025
**Version**: 1.0.0
