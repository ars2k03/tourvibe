# Project Structure (STRUCTURE.md)

---

## 1. Root Directory

```text
tourvibe/
├── .github/
│   ├── CODEOWNERS
│   ├── CONTRIBUTING.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── config.yml
│       ├── bug_report.md
│       └── feature_request.md
├── AGENTS.md
├── STRUCTURE.md
├── TECHSTACK.md
├── DESIGN.md
├── README.md
├── LICENSE
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── .gitignore
├── .gitattributes
├── ForegX Project Upgrade with AI instruction.docx
├── client/
└── server/
```

---

## 2. Client Application (`client/`)

```text
client/
├── public/
│   ├── images/
│   │   ├── .gitkeep
│   │   ├── tourvibe-logo.svg
│   │   ├── tourvibe-logo-dark.svg
│   │   └── tourvibe-mark.svg
├── vercel.json
├── .npmrc
├── .oxlintrc.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── icon.svg
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── tours/
│   │   │   ├── page.tsx
│   │   │   ├── tours-explorer.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   └── page.tsx
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── tours/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── create/
│   │   │       │   │   └── page.tsx
│   │   │       │   └── [id]/
│   │   │       │       └── edit/
│   │   │       │           └── page.tsx
│   │   │       ├── users/
│   │   │       │   └── page.tsx
│   │   │       ├── categories/
│   │   │       │   └── page.tsx
│   │   │       ├── reports/
│   │   │       │   └── page.tsx
│   │   │       └── settings/
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
│   │   │   ├── pagination.tsx
│   │   │   ├── providers.tsx
│   │   │   └── tourvibe-logo.tsx
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
│   │       ├── booking-modal.tsx
│   │       └── review-form.tsx
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
│   │   ├── review-service.ts
│   │   └── dashboard-service.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── tour.ts
│   │   ├── user.ts
│   │   ├── booking.ts
│   │   └── review.ts
│   └── lib/
│       ├── utils.ts
│       ├── validators.ts
│       └── demo-credentials.ts
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
│   │   ├── Category.ts
│   │   └── Contact.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── tourController.ts
│   │   ├── bookingController.ts
│   │   ├── reviewController.ts
│   │   ├── categoryController.ts
│   │   ├── dashboardController.ts
│   │   └── contactController.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── tourRoutes.ts
│   │   ├── bookingRoutes.ts
│   │   ├── reviewRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── dashboardRoutes.ts
│   │   └── contactRoutes.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   ├── errorMiddleware.ts
│   │   └── uploadMiddleware.ts
│   ├── types/
│   │   ├── express.d.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── token.ts
│   │   ├── apiResponse.ts
│   │   ├── validators.ts
│   │   ├── ensureAdmin.ts
│   │   ├── ensureDemoTraveler.ts
│   │   └── seedData.ts
│   ├── app.ts
│   └── index.ts
├── uploads/
│   └── .gitkeep
├── Dockerfile
├── .dockerignore
├── .npmrc
├── docker-compose.yml
├── render.yaml
├── .env.example
├── tsconfig.json
└── package.json
```
