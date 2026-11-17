# Project Development & Coding Guidelines (AGENTS.md)

This document defines the strict development standards, architectural rules, and coding principles for all AI agents and developers working on this project (`tourvibe`). Every instruction must be followed line by line without exception.

---

## 1. Architectural Integrity & Clean Code
- **Modular Architecture**:
  - **Client (`/client`)**: Next.js App Router (`app/`), reusable components (`components/ui/`, `components/shared/`), hooks (`hooks/`), types (`types/`), lib/utilities (`lib/`), and services/API client (`services/`).
  - **Server (`/server`)**: Layered modular structure: `routes/`, `controllers/`, `models/`, `middleware/`, `config/`, and `utils/`.
- **Separation of Concerns**: Controllers handle HTTP logic and delegate database interactions to models or services. Components handle presentation and UI state; API calls and validations reside in dedicated modules.
- **Strict Typing & 100% TypeScript**:
  - The entire project—both Frontend (`/client`) and Backend (`/server`)—must be written in **100% TypeScript (`.ts` and `.tsx`)**.
  - **Zero JavaScript (`.js`)**: No `.js` files are permitted in application source code.
  - Strict type definitions across models, controllers, middleware, routes, services, and UI components without lazy `any` types.

---

## 2. Latest Tech Stack & Documentation Compliance
- **Always Use the Latest Tech Stack & APIs**:
  - **Next.js 16+ & React 19+**: Use modern Server Components, Client Components (`'use client'`), Server Actions / Route Handlers, and modern caching/navigation paradigms.
  - **Tailwind CSS v4+**: Utilize modern Tailwind v4 CSS-first configuration and directives without obsolete Tailwind v3 configuration conventions.
  - **Express.js & Mongoose 8+**: Use modern async/await, centralized error handling, and modern schema definitions.
  - **Recharts, Embla Carousel, Lucide React, Zod**: Adhere to their latest stable API signatures.
- **Never Use Deprecated or Legacy Patterns**:
  - No legacy React lifecycle methods, Pages Router patterns, or deprecated Mongoose callback signatures.
- **Research & Verify Before Coding**:
  - When writing code or integrating libraries, always check, fetch, or search latest documentation to confirm breaking changes, recommended APIs, and current best practices before writing code.

---

## 3. Zero Dummy Content Policy
- **No Dummy / Placeholder / Lorem Ipsum**:
  - Dummy text (such as "Lorem ipsum dolor sit amet", "Sample title", "Test description", "image_placeholder.png") is strictly forbidden in production code, UI components, and mock/seed data.
  - All content, titles, descriptions, locations, prices, specifications, reviews, and test data must be realistic, domain-specific (travel and tourism platform), meaningful, and well-written.

---

## 4. No Unnecessary Comments
- **Self-Documenting Code**: Write code that is clean, descriptive, and readable by nature through proper naming conventions for variables, functions, and files.
- **Zero Redundant Comments**: Do not add trivial or obvious comments (e.g., `// import React`, `// return JSX`, `// increment i`, `// controller function`).
- Only include essential, high-value explanations if documenting an intricate algorithm, non-obvious business rule, or complex regex.

---

## 5. UI/UX, Design System & Accessibility
- **Design System Constraints**:
  - Maximum 3 primary colors (+ optional neutral palette).
  - Seamless Light Mode and Dark Mode support with proper contrast ratios.
  - Consistent 4px / 8px spacing grid and unified border radii (e.g., `rounded-xl`).
  - Strict responsive behavior across Mobile, Tablet, and Desktop with zero horizontal overflow.
- **Interactive & Dynamic UI**:
  - Interactive elements (carousels, sliders, dynamic statistics, charts).
  - Proper form states: client-side and server-side validation, error states, accessible labels, and loading skeletons/spinners.

---

## 6. Security & Performance
- **Security Standards**:
  - Secure password hashing with `bcryptjs`.
  - Stateless JWT-based authentication with expiration handling and role-based middleware (`User`, `Admin`).
  - Input sanitation and validation with `zod`.
  - Proper CORS and environment variable isolation (`.env`).
- **Performance**:
  - Next.js image optimization (`next/image`), code splitting, lazy loading, and prevention of unnecessary re-renders.
  - No development `console.log` statements in production code.

---

## 7. Step-by-Step Implementation & Granular Git Commits
- **Iterative Implementation**: Development must proceed step-by-step in logical, verifiable phases.
- **Commit Per Implementation**: Every individual feature, module, or milestone must be committed to Git immediately upon implementation and verification (e.g., `git add .` and `git commit`).
- **Meaningful Commit Messages**: Follow Conventional Commits format with clear, descriptive messages:
  - `feat: ...` for new features or modules
  - `fix: ...` for bug fixes
  - `refactor: ...` for structural code refinements
  - `style: ...` for UI/styling updates
  - `chore: ...` for configuration and setup tasks
- **No Lump-Sum Commits**: Never make massive single commits combining multiple unrelated features. Maintain a clean, progressive Git history.

---

## 8. Dynamic Structure Synchronization (STRUCTURE.md)
- **Real-Time Architecture Sync**: If project requirements or implementation realities necessitate adding new files, directories, or refactoring existing paths, the developer or AI agent must immediately update `STRUCTURE.md` to keep it 100% in sync with the physical codebase.
- **Pure IDE Style Maintenance**: Whenever updating `STRUCTURE.md`, maintain the strict separation between Root, Client, and Server with pure IDE-style tree formatting (zero comments or inline annotations).
