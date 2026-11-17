# Final Project Tech Stack (TECHSTACK.md)

This document contains the complete, definitive inventory of all technologies, libraries, runtimes, and packages used across the 100% implementation of **TourVibe**. All dependencies are locked to their latest exact production versions.

---

## 1. Core Ecosystem & Runtimes

| Technology | Exact Version | Role / Purpose |
| :--- | :--- | :--- |
| **Node.js** | `v22.14.0` (LTS) | JavaScript/TypeScript Server Runtime |
| **TypeScript** | `5.8.2` | Strong Type Safety (100% Client & Server) |
| **MongoDB Atlas** | `v8.0` | Cloud NoSQL Database Cluster |
| **npm** | `10.9.2` | Node Package Manager |

---

## 2. Frontend Stack (`client/`)

### Production Dependencies
| Package | Exact Version | Purpose / Category |
| :--- | :--- | :--- |
| `next` | `16.4.6` | App Router, Server Components & Image Optimization |
| `react` | `19.3.0` | Modern React Engine |
| `react-dom` | `19.3.0` | React DOM Renderer |
| `tailwindcss` | `4.3.3` | Tailwind CSS v4 Engine |
| `lucide-react` | `1.16.0` | Accessible Vector UI Icons |
| `recharts` | `2.15.1` | Analytics Charts (Bar, Line, Pie) |
| `embla-carousel-react` | `8.5.2` | Hero & Details Media Slider / Carousel |
| `axios` | `1.7.9` | Strongly-Typed HTTP Client with Interceptors |
| `zod` | `3.24.2` | Schema-based Client Validation |
| `react-hook-form` | `7.54.2` | Performant Form State Management |
| `@hookform/resolvers` | `3.10.0` | Zod Resolver for React Hook Form |
| `next-themes` | `0.4.4` | Dark / Light Mode Switcher & Persistence |
| `clsx` | `2.1.1` | Dynamic CSS Class Name Composition |
| `tailwind-merge` | `3.0.2` | Safe Tailwind CSS Class Conflict Merging |
| `sonner` | `2.0.1` | Modern Toast Notifications |

### Developer Dependencies
| Package | Exact Version | Purpose / Category |
| :--- | :--- | :--- |
| `@tailwindcss/turbopack` | `4.3.3` | Turbopack integration for Tailwind CSS v4 |
| `@types/node` | `22.13.4` | TypeScript Definitions for Node.js |
| `@types/react` | `19.0.10` | TypeScript Definitions for React 19 |
| `@types/react-dom` | `19.0.4` | TypeScript Definitions for React DOM 19 |
| `eslint` | `9.20.1` | Static Code Analysis & Linter |
| `eslint-config-next` | `16.4.6` | Next.js ESLint Configuration |

---

## 3. Backend Stack (`server/`)

### Production Dependencies
| Package | Exact Version | Purpose / Category |
| :--- | :--- | :--- |
| `express` | `4.21.2` | Modular REST API Framework |
| `mongoose` | `8.10.1` | MongoDB Object Data Modeling (ODM) |
| `jsonwebtoken` | `9.0.2` | Stateless JWT Token Generation & Verification |
| `bcryptjs` | `3.0.2` | Salted Password Hashing |
| `cors` | `2.8.5` | Cross-Origin Resource Sharing Middleware |
| `dotenv` | `16.4.7` | Environment Variable Management |
| `zod` | `3.24.2` | Server-Side Request Body & Params Validation |
| `helmet` | `8.0.0` | HTTP Header Security Hardening |
| `cookie-parser` | `1.4.7` | HTTP Cookie Header Parser |
| `morgan` | `1.10.0` | HTTP Request Logger |

### Developer Dependencies
| Package | Exact Version | Purpose / Category |
| :--- | :--- | :--- |
| `tsx` | `4.19.3` | High-Speed TypeScript Execution & Watcher |
| `@types/express` | `5.0.0` | TypeScript Definitions for Express |
| `@types/node` | `22.13.4` | TypeScript Definitions for Node.js |
| `@types/cors` | `2.8.17` | TypeScript Definitions for CORS |
| `@types/jsonwebtoken` | `9.0.8` | TypeScript Definitions for JWT |
| `@types/bcryptjs` | `2.4.6` | TypeScript Definitions for bcryptjs |
| `@types/cookie-parser` | `1.4.8` | TypeScript Definitions for cookie-parser |
| `@types/morgan` | `1.9.9` | TypeScript Definitions for morgan |

---

## 4. Root & Development Orchestration

| Package | Exact Version | Purpose / Category |
| :--- | :--- | :--- |
| `concurrently` | `9.1.2` | Concurrent execution of Client and Server dev processes |

---

## 5. Deployment & Cloud Services

| Platform / Service | Tier / Engine | Role |
| :--- | :--- | :--- |
| **Vercel** | Production Edge | Frontend Next.js 16 Deployment |
| **Render / Railway** | Node.js Web Service | Backend Express API Deployment |
| **MongoDB Atlas** | Managed M0/M10 | Cloud Database Cluster |
