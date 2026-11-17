# TourVibe

Production-ready travel platform for guided expeditions across Bangladesh — Sajek, Cox's Bazar, Sundarbans, Srimangal, Bandarban, and more.

## Stack

- **Client:** Next.js 16, React 19, Tailwind CSS 4, Recharts, Embla Carousel
- **Server:** Express 5, Mongoose 9, Zod, JWT, bcryptjs
- **Database:** MongoDB

Exact versions: `TECHSTACK.md`. Architecture: `STRUCTURE.md`. UI: `DESIGN.md`.

## Quick start

### 1. Database

```bash
docker start tourvibe-mongo
# or first time:
docker run -d --name tourvibe-mongo -p 27017:27017 mongo:7
```

### 2. Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:5000`  
Seed data loads automatically on first boot.

### 3. Client

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App: `http://localhost:3000`

## Demo accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| Admin | `admin@tourvibe.com` | `Admin@123` |
| Traveler | `traveler@tourvibe.com` | `Travel@123` |

## Google login (bonus)

1. Create OAuth credentials in Google Cloud Console.
2. Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
3. Set in `server/.env`:

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

4. Restart the API, then use **Continue with Google** on `/login`.

## Deploy

- Frontend: Vercel (`client/`, set `NEXT_PUBLIC_API_URL` to your live API `/api`)
- Backend: Render / Railway (`server/`, use `render.yaml` or equivalent env vars)
- Database: MongoDB Atlas

Required production env on API: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `SERVER_URL`, optional Google keys.

## Features

- Landing page with carousel, categories, featured tours, stats, FAQ, newsletter
- Tour explore with search, filters, sort, pagination
- Tour details, gallery, reviews (+ submit), related tours, booking
- JWT auth + Google OAuth, User / Admin roles, demo login
- Traveler dashboard and admin panel (CRUD tours, users, categories, reports, charts)
- Profile update with image upload
- Contact form persisted to MongoDB
- Light / dark theme (Oxford Navy & Crisp White)
