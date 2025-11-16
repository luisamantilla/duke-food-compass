# Duke Food Compass - Quick Start Guide

Get up and running in 5 minutes! Choose your deployment path:

## 🚀 Option 1: Deploy to Production (Vercel + Supabase Cloud)

**Perfect for: Immediate deployment, no local setup needed**

### Step 1: Create Supabase Project (2 minutes)

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Name: `duke-food-compass`
4. Set strong password (save it!)
5. Region: `us-east-1` (or closest to you)
6. Click **"Create new project"** → Wait 2-3 minutes

### Step 2: Set Up Database (1 minute)

1. In Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Copy **entire contents** of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **"Run"** ▶️
5. You should see: "Success. No rows returned"

### Step 3: Seed Data (1 minute)

1. In SQL Editor, click **"New query"** again
2. Copy **entire contents** of `supabase/migrations/002_seed_data.sql`
3. Paste and click **"Run"** ▶️
4. Verify: Go to **Table Editor** → Should see 7 tables with data

### Step 4: Deploy to Vercel (1 minute)

1. Push your code to GitHub (if not already)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables (from Supabase Dashboard → Settings → API):
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your anon public key
5. Click **"Deploy"**
6. Wait 2-3 minutes → Done! 🎉

**Your app is live!** Visit the Vercel URL to see it.

---

## 💻 Option 2: Local Development (Docker + Supabase Emulator)

**Perfect for: Development without internet, testing locally**

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Node.js 18+ installed

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

### Step 2: Start Supabase Locally

```bash
# Clone and enter project
git clone <your-repo-url>
cd duke-food-compass

# Install dependencies
npm install

# Start Supabase (requires Docker running!)
supabase start
```

**Wait 2-3 minutes.** You'll see output like:

```
API URL: http://localhost:54321
DB URL: postgresql://postgres:postgres@localhost:54322/postgres
Studio URL: http://localhost:54323
anon key: eyJhbGci...
service_role key: eyJhbGci...
```

### Step 3: Configure Environment

```bash
# Copy local environment template
cp .env.local.example .env.local

# Edit .env.local with keys from `supabase start` output
# (Most values should already be correct for local dev)
```

### Step 4: Apply Migrations & Seed

```bash
# Apply database schema
supabase db reset

# Seed data
npm run seed
```

### Step 5: Run Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

**Access local Supabase Studio:** [http://localhost:54323](http://localhost:54323)

---

## 🔧 Option 3: Hybrid (Cloud Supabase + Local Dev)

**Perfect for: Team development, staging environment**

### Step 1: Create Supabase Project

Follow **Option 1, Steps 1-3** to set up cloud Supabase

### Step 2: Configure Local Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your Supabase credentials:
# - NEXT_PUBLIC_SUPABASE_URL (from Supabase Dashboard)
# - NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase Dashboard)
# - SUPABASE_SERVICE_ROLE_KEY (for seeding only)
```

### Step 3: Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 📋 Verify Everything Works

After deployment, test these features:

- [ ] **Homepage** loads with navigation
- [ ] **Recommendations** page shows food places
- [ ] **Specials** page displays today's deals
- [ ] **Friends** page renders (may be empty)
- [ ] **Mood** selector generates recommendations
- [ ] **Remix** creates dining hall hacks

### Check Data in Supabase

Run this query in SQL Editor:

```sql
SELECT
  (SELECT COUNT(*) FROM users) as users,
  (SELECT COUNT(*) FROM food_places) as places,
  (SELECT COUNT(*) FROM specials) as specials,
  (SELECT COUNT(*) FROM ratings) as ratings;
```

**Expected:**
- users: 10
- places: 20
- specials: 25
- ratings: 50+

---

## 🆘 Troubleshooting

### "Invalid API Key" Error

**Fix:** Double-check environment variables in Vercel or `.env.local`

```bash
# Verify locally
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### "Table does not exist" Error

**Fix:** Run migrations first

```bash
# Cloud: Run 001_initial_schema.sql in Supabase SQL Editor
# Local: supabase db reset
```

### Pages Show No Data

**Fix:** Seed the database

```bash
# Cloud: Run 002_seed_data.sql in Supabase SQL Editor
# Local: npm run seed
```

### Supabase Won't Start Locally

**Fix:** Ensure Docker Desktop is running

```bash
# Check Docker
docker --version

# Restart Supabase
supabase stop --no-backup
supabase start
```

---

## 📚 Next Steps

Once deployed:

1. **Custom Domain** - Add in Vercel settings
2. **Authentication** - Enable Supabase Auth providers
3. **Row Level Security** - Set up RLS policies in Supabase
4. **Analytics** - Enable Vercel Analytics
5. **Monitoring** - Add error tracking (Sentry, LogRocket)

---

## 🔗 Useful Links

- **Full Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Supabase Dashboard:** [supabase.com/dashboard](https://supabase.com/dashboard)
- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Database (Local)
npm run seed               # Seed database
supabase start             # Start local Supabase
supabase stop              # Stop local Supabase
supabase status            # Check status
supabase db reset          # Reset & migrate

# Deployment
vercel                     # Deploy to preview
vercel --prod              # Deploy to production
```

---

**Need help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
