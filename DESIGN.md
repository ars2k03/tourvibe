# Frontend UI/UX Design System Specification (DESIGN.md)

This document establishes the official and immutable UI/UX design language, color tokens, typography hierarchy, and component styling rules for the **TourVibe** frontend (`client/`). All developers and AI agents must follow this specification line by line.

---

## 1. Design Philosophy & Core Aesthetic

- **Minimalist & Editorial (ChakriAI & Linear Inspired)**: Clean, high-contrast, distraction-free aesthetic with generous whitespace and structured bento-style cards.
- **Zero Gradient Policy**: Strictly **NO** multi-color gradients, gradient backgrounds, glowing radial blobs, or clipped-gradient text. All surfaces and buttons must utilize crisp solid colors and refined hairline borders.
- **Trust & Authority**: Deep Oxford Navy anchors the visual hierarchy, paired with immaculate pure white surfaces and muted slate metadata.

---

## 2. Official Color Palette: "Oxford Navy & Crisp White"

The palette complies strictly with the design rule of **maximum 3 primary colors + neutral palette**.

| Token Role | Semantic Name | Hex Code | Tailwind / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | **Deep Oxford Navy** | `#0B1E3D` | Primary CTAs, active buttons, logos, navbar accents |
| **Primary Hover** | **Midnight Blue** | `#152E59` | Hover state for primary buttons and interactive elements |
| **Surface (Light)** | **Crisp Pure White** | `#FFFFFF` | Main page background, card surfaces, modal dialogs |
| **Surface Alt (Light)** | **Subtle Slate Tint** | `#F8FAFC` | Alternating section backgrounds, search docks, table headers |
| **Borders & Dividers** | **Slate Hairline** | `#E2E8F0` | Delicate 1px structural dividing lines |
| **Text Primary** | **Ink Slate** | `#0F172A` | High-contrast headings and body prose |
| **Text Muted / Meta** | **Muted Slate** | `#64748B` | Secondary descriptions, labels, and timestamps |
| **Dark Mode Surface** | **Deep Obsidian Navy** | `#0A0F1D` | Deep navy canvas for dark mode |
| **Dark Mode Card** | **Navy Surface** | `#0F172A` | Card backgrounds and elevated panels in dark mode |
| **Dark Mode Border** | **Dark Slate Border** | `#1E293B` | Hairline borders in dark mode |
| **Accent / Rating** | **Warm Amber** | `#F59E0B` | Star ratings, badges, and verified highlights |

---

## 3. Typographic Hierarchy (Editorial Tech Style)

A sophisticated multi-font hierarchy providing distinct character to headings, body, and metadata:

1. **Primary Interface Font (`font-sans`)**:
   - `Plus Jakarta Sans`, `Inter`, or system neo-grotesque sans-serif.
   - Used for: Main headings, navigation links, buttons, form inputs, and body text.
   - High legibility, crisp rendering, and modern geometric feel.

2. **Editorial Accent Font (`font-serif` / `font-editorial`)**:
   - `Playfair Display`, `Instrument Serif`, or system serif italic (`ui-serif, Georgia, Cambria`).
   - Used selectively for: Italicized emotional accent words in hero and major section titles (e.g., *Untamed Horizons*, *Expeditions*, *The Journey*, *Ethical*).

3. **Technical & Tabular Metadata (`font-mono`)**:
   - `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`.
   - Used for: Pricing values (`$149`), durations (`3D / 2N`), guest counts, review counts, and status tags (`VERIFIED`, `01 / PRICING`).

---

## 4. Layout, Spacing & Elevation Grid

- **Spacing System**: Strict adherence to a 4px / 8px grid (`p-2`, `p-4`, `p-6`, `p-8`, `gap-3`, `gap-6`, `gap-8`).
- **Border Radius**:
  - Components, buttons, and inputs: `rounded-lg` (8px) or `rounded-xl` (12px).
  - Cards, modals, and search docks: `rounded-xl` (12px) or `rounded-2xl` (16px).
  - Badges and pills: `rounded-full`.
- **Elevation & Shadows**:
  - Extremely subtle: `shadow-sm` on rest, transitioning to `hover:shadow-md` on hover.
  - Rely on 1px solid hairline borders (`border border-slate-200 dark:border-slate-800`) rather than heavy blurred drop shadows.

---

## 5. Component Styling Specifications

### 5.1 Buttons
- **Primary Action**: `bg-[#0B1E3D] hover:bg-[#152E59] text-white font-semibold rounded-lg px-5 py-2.5 transition shadow-sm`.
- **Secondary Action / Outline**: `bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg px-5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition`.
- **Ghost Action**: `text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg transition`.

### 5.2 Tour & Content Cards
- Desktop layout: **Exactly 4 cards per row** on desktop (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`).
- Unified dimensions: Identical height, border radius, and padding across all cards in the grid.
- Media container: Aspect ratio `16/10` with subtle image zoom on card hover (`transition duration-300 hover:scale-105`).
- Meta layout: Duration and guest capacity separated by clean hairline dividers.
- Action: "View Details" button linking to details page or opening the quick-view modal.

### 5.3 Forms & Inputs
- Container: Clean white surface with `border border-slate-200 dark:border-slate-700 focus:border-[#0B1E3D] focus:ring-1 focus:ring-[#0B1E3D]`.
- Labels: Small uppercase tracked labels (`text-[11px] font-bold uppercase tracking-wider text-slate-500`).
- Validation: Client and server-side Zod validation with clear error states (`text-red-500 text-xs`).

### 5.4 Sticky Navbar
- Height: `h-18` (72px) with `sticky top-0 z-40`.
- Material: `bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800`.
- States: Dynamically renders minimum 4 routes for logged out users, minimum 6 routes for logged in users with an avatar profile dropdown.

---

## 6. Zero Dummy Content Standard
All copy, tour locations, specifications, pricing, reviews, and blog articles must reflect realistic tourism data:
- Authentic destinations: Sajek Valley, Cox's Bazar, Sundarbans, Srimangal, Bandarban.
- Real currency and price formats (e.g., `$149`, `BDT 16,500`).
- Meaningful traveler reviews with names, tour names, and authentic feedback.
