# TourVibe Tech Stack

## Core

| Stack | Version |
| :--- | :--- |
| Node.js | `26.13.1` (LTS) |
| TypeScript | `7.0.2` |
| MongoDB Atlas | `9.0.8` |
| npm | `11.20.0` |

## Frontend (`client/`)

| Package | Version |
| :--- | :--- |
| `next` | `16.4.6` |
| `react` | `19.3.1` |
| `react-dom` | `19.3.1` |
| `tailwindcss` | `4.3.5` |
| `lucide-react` | `1.74.0` |
| `recharts` | `3.10.1` |
| `embla-carousel-react` | `8.6.0` |
| `axios` | `1.21.1` |
| `zod` | `4.6.7` |
| `react-hook-form` | `7.92.0` |
| `@hookform/resolvers` | `7.0.7` |
| `next-themes` | `0.4.6` |
| `clsx` | `2.1.1` |
| `tailwind-merge` | `3.7.0` |
| `sonner` | `2.0.8` |
| `@tailwindcss/turbopack` | `4.3.5` |
| `@types/node` | `26.6.6` |
| `@types/react` | `19.3.0` |
| `@types/react-dom` | `19.3.0` |
| `eslint` | `10.15.0` |
| `eslint-config-next` | `16.4.6` |

## Backend (`server/`)

| Package | Version |
| :--- | :--- |
| `express` | `5.3.0` |
| `mongoose` | `9.12.2` |
| `jsonwebtoken` | `9.0.3` |
| `bcryptjs` | `3.0.3` |
| `cors` | `2.8.6` |
| `dotenv` | `18.0.10` |
| `zod` | `4.6.7` |
| `helmet` | `8.3.0` |
| `cookie-parser` | `1.4.7` |
| `morgan` | `1.12.1` |
| `multer` | `2.5.0` |
| `tsx` | `4.23.15` |
| `@types/express` | `5.0.6` |
| `@types/node` | `26.6.6` |
| `@types/cors` | `2.8.19` |
| `@types/jsonwebtoken` | `9.0.10` |
| `@types/cookie-parser` | `1.4.10` |
| `@types/morgan` | `1.9.10` |
| `@types/multer` | `2.3.0` |

## Deploy

| Service | Role |
| :--- | :--- |
| Vercel | Frontend |
| Render / Railway (Docker) | Backend |
| MongoDB Atlas | Database |
| Docker | Backend container (`server/Dockerfile`, Node `26-alpine`) |
