import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number"),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(80).optional(),
  phone: z.string().trim().max(20).optional(),
  bio: z.string().trim().max(500).optional(),
  avatar: z.string().url().optional(),
  password: z
    .string()
    .min(6)
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[0-9]/, "Password must include a number")
    .optional(),
});

export const tourQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  difficulty: z.enum(["easy", "moderate", "challenging"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  featured: z.enum(["true", "false"]).optional(),
  sort: z
    .enum(["price-asc", "price-desc", "rating", "newest"])
    .optional()
    .default("newest"),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(48).optional().default(12),
});

export const createTourSchema = z.object({
  title: z.string().trim().min(3),
  summary: z.string().trim().min(20),
  description: z.string().trim().min(40),
  location: z.string().trim().min(2),
  country: z.string().trim().min(2).default("Bangladesh"),
  durationDays: z.coerce.number().min(1),
  durationNights: z.coerce.number().min(0),
  maxGuests: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
  currency: z.string().default("BDT"),
  discountPercent: z.coerce.number().min(0).max(80).default(0),
  images: z.array(z.string().url()).min(1),
  coverImage: z.string().url(),
  category: z.string().min(1),
  difficulty: z.enum(["easy", "moderate", "challenging"]).default("moderate"),
  highlights: z.array(z.string()).default([]),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  itinerary: z
    .array(
      z.object({
        day: z.number().min(1),
        title: z.string().min(2),
        description: z.string().min(10),
      }),
    )
    .default([]),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  startDates: z.array(z.coerce.date()).default([]),
});

export const updateTourSchema = createTourSchema.partial();

export const bookingSchema = z.object({
  tourId: z.string().min(1),
  guests: z.coerce.number().min(1),
  startDate: z.coerce.date(),
  specialRequests: z.string().max(500).optional().default(""),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

export const reviewSchema = z.object({
  tourId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().trim().min(3).max(120),
  comment: z.string().trim().min(10).max(1000),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2),
  description: z.string().trim().min(10),
  image: z.string().url(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  subject: z.string().trim().min(3),
  message: z.string().trim().min(10),
});

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
