<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="client/public/images/tourvibe-logo-dark.svg" />
  <img src="client/public/images/tourvibe-logo.svg" alt="TourVibe" width="280" height="72" />
</picture>

<br />

**Guided expeditions across Bangladesh**

Curated journeys through Sajek, Cox's Bazar, the Sundarbans, Srimangal, Bandarban, and beyond — with transparent pricing, local hosts, and a full traveler + admin experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-0B1E3D.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](./TECHSTACK.md)
[![Express](https://img.shields.io/badge/Express-5-000000.svg)](./TECHSTACK.md)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](./TECHSTACK.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6.svg)](./TECHSTACK.md)

**Live** · [Website](https://tourvibe-ars.vercel.app/) · [API](https://tourvibe-pkjv.onrender.com/api/health) · [GitHub](https://github.com/ars2k03/tourvibe)

</div>

---

## Overview

TourVibe is a production-oriented travel platform built for the ForegX full-stack upgrade brief. It ships a public marketing + booking surface, JWT authentication (with optional Google OAuth), traveler dashboards, and an admin operations desk with charts, CRUD, and reporting.

| Layer | Stack |
| :--- | :--- |
| Frontend | Next.js 16 · React 19 · Tailwind CSS 4 · Recharts · Embla |
| Backend | Express 5 · Mongoose 9 · Zod · JWT · bcryptjs · Multer |
| Database | MongoDB Atlas |
| Design | Oxford Navy & Crisp White (`DESIGN.md`) |

Exact package versions live in [`TECHSTACK.md`](./TECHSTACK.md). Folder layout lives in [`STRUCTURE.md`](./STRUCTURE.md).

---

## Features

- Immersive landing page (hero carousel, categories, featured tours, live stats, FAQ, newsletter)
- Tour explore with search, multi-filters, sorting, pagination, and skeletons
- Tour details with gallery, itinerary, related tours, booking modal, and reviews
- Auth: register / login, Google OAuth, protected dashboards
- Traveler dashboard: overview, bookings, profile (image upload), settings
- Admin desk: tours CRUD, users, categories, reports, Recharts analytics
- Contact form persisted to MongoDB · light / dark theme · responsive UI

---

## Quick start

### Prerequisites

- Node.js `26.x` and npm `11.x`
- MongoDB Atlas connection string (or local MongoDB)

### 1. Clone

```bash
git clone https://github.com/<your-username>/tourvibe.git
cd tourvibe
```

### 2. Backend

```bash
cd server
cp .env.example .env
# fill MONGODB_URI, JWT_SECRET, CLIENT_URL, SERVER_URL,
# ADMIN_EMAIL, ADMIN_PASSWORD (required), plus optional Google OAuth keys
npm install
npm run dev
```

API → `http://localhost:5000`

On first boot (empty DB), categories/tours seed automatically.  
Admin is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` via `ensureAdminFromEnv()` (only if that email does not already exist).

### 3. Frontend

```bash
cd client
cp .env.example .env
# set NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev
```

App → `http://localhost:3000`

---

## Environment variables

Copy the example files and fill values locally (examples stay empty on purpose):

| File | Purpose |
| :--- | :--- |
| `server/.env.example` | API keys, MongoDB URI, JWT, admin credentials, Google OAuth |
| `client/.env.example` | `NEXT_PUBLIC_API_URL` |

Never commit real `.env` files.

### Google OAuth (optional)

1. Create a Web application OAuth client in Google Cloud Console  
2. Authorized JavaScript origin: `http://localhost:3000`  
3. Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`  
4. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_CALLBACK_URL` in `server/.env`

---

## Demo access

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env`. On boot the API ensures both demo accounts below exist. The login page also has **Demo traveler** / **Demo admin** buttons that auto-fill credentials.

| Role | Email | Password |
| :--- | :--- | :--- |
| Traveler | `traveler@tourvibe.com` | `Traveler@123` |
| Admin | `admin@tourvibe.com` | `Admin@123` |

New travelers can also use **Register**. Promote users to admin from the admin users desk when needed.

---

## Scripts

| Location | Command | Description |
| :--- | :--- | :--- |
| `server/` | `npm run dev` | API with hot reload |
| `server/` | `npm run build` | Compile TypeScript → `dist/` |
| `server/` | `npm start` | Run compiled API |
| `client/` | `npm run dev` | Next.js development server |
| `client/` | `npm run build` | Production build |
| `client/` | `npm start` | Serve production build |

---

## Project structure

```text
tourvibe/
├── client/          # Next.js App Router frontend
├── server/          # Express + MongoDB API
├── DESIGN.md        # UI system
├── STRUCTURE.md     # Architecture tree
├── TECHSTACK.md     # Locked versions
├── SECURITY.md      # Vulnerability reporting notes
├── LICENSE          # MIT
└── README.md
```

---

## Deployment

| Service | Role | Live URL |
| :--- | :--- | :--- |
| Vercel | Frontend (`client/`, see `client/vercel.json`) | https://tourvibe-ars.vercel.app/ |
| Render (Docker) | Backend (`server/Dockerfile`, `server/render.yaml`) | https://tourvibe-pkjv.onrender.com |
| MongoDB Atlas | Database | Cloud cluster |

Production env references: `client/.env.vercel`, `server/.env.render` (gitignored).  
Set Render `CLIENT_URL=https://tourvibe-ars.vercel.app` and Google OAuth authorized origins / redirect URI to the live frontend + `https://tourvibe-pkjv.onrender.com/api/auth/google/callback`.

### Backend Docker (local)

```bash
cd server
# fill production keys in .env.render first
docker compose up --build -d
```

Health check: `http://localhost:5000/api/health`

### Backend on Render (Docker)

1. New Web Service → connect the repo
2. Runtime: **Docker**
3. Root Directory: `server`
4. Dockerfile path: `./Dockerfile`
5. Add env vars from `server/.env.render` (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `SERVER_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, Google keys, etc.)
6. Deploy — public URL becomes `SERVER_URL` / Google callback host

Set production `CLIENT_URL`, `SERVER_URL`, `MONGODB_URI`, `JWT_SECRET`, and `NEXT_PUBLIC_API_URL` on the respective hosts. Update Google redirect URIs for live domains.

---

## Contributing

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md) for setup, branch, and PR guidelines.  
By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).  
Bug reports and feature requests use the templates under [`.github/ISSUE_TEMPLATE/`](./.github/ISSUE_TEMPLATE/).

---

## Author

**A R S**  
TourVibe — personal full-stack travel platform project.

---

## License

This project is licensed under the [MIT License](./LICENSE).
