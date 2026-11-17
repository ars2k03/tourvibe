# Project Structure (STRUCTURE.md)

---

## 1. Root Directory

```text
tourvibe/
├── AGENTS.md
├── STRUCTURE.md
├── package.json
├── client/
└── server/
```

---

## 2. Client Application (`client/`)

```text
client/
├── public/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── tours/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   └── admin/
│   │   │       ├── tours/
│   │   │       │   ├── page.tsx
│   │   │       │   └── create/
│   │   │       │       └── page.tsx
│   │   │       ├── users/
│   │   │       │   └── page.tsx
│   │   │       └── reports/
│   │   │           └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   └── privacy/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dropdown.tsx
│   │   │   └── skeleton.tsx
│   │   ├── shared/
│   │   │   ├── navbar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── theme-toggle.tsx
│   │   │   └── pagination.tsx
│   │   ├── home/
│   │   │   ├── hero-carousel.tsx
│   │   │   ├── destination-categories.tsx
│   │   │   ├── featured-tours.tsx
│   │   │   ├── dynamic-stats.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── testimonials-slider.tsx
│   │   │   ├── blog-preview.tsx
│   │   │   ├── faq-accordion.tsx
│   │   │   └── newsletter.tsx
│   │   ├── dashboard/
│   │   │   ├── sidebar.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── analytics-charts.tsx
│   │   │   └── data-table.tsx
│   │   └── tours/
│   │       ├── tour-card.tsx
│   │       ├── tour-filters.tsx
│   │       ├── tour-gallery.tsx
│   │       └── booking-modal.tsx
│   ├── context/
│   │   ├── auth-context.tsx
│   │   └── theme-provider.tsx
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   └── use-debounce.ts
│   ├── services/
│   │   ├── api-client.ts
│   │   ├── auth-service.ts
│   │   ├── tour-service.ts
│   │   ├── booking-service.ts
│   │   └── dashboard-service.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── tour.ts
│   │   ├── user.ts
│   │   └── booking.ts
│   └── lib/
│       ├── utils.ts
│       └── validators.ts
├── .env.example
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Server Application (`server/`)

```text
server/
├── src/
│   ├── config/
│   │   ├── db.ts
│   │   └── env.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Tour.ts
│   │   ├── Booking.ts
│   │   ├── Review.ts
│   │   └── Contact.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── tourController.ts
│   │   ├── bookingController.ts
│   │   ├── dashboardController.ts
│   │   └── contactController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── tourRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   ├── dashboardRoutes.ts
│   │   └── contactRoutes.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── validateMiddleware.ts
│   ├── types/
│   │   ├── express.d.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── token.ts
│   │   ├── apiResponse.ts
│   │   └── seedData.ts
│   ├── app.ts
│   └── index.ts
├── .env.example
├── tsconfig.json
└── package.json
```
