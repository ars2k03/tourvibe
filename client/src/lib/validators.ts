import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "Include an uppercase letter")
    .regex(/[0-9]/, "Include a number"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const bookingSchema = z.object({
  guests: z.coerce.number().min(1, "At least 1 guest"),
  startDate: z.string().min(1, "Select a start date"),
  specialRequests: z.string().max(500).optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),
  password: z
    .string()
    .optional()
    .refine(
      (value) => !value || (value.length >= 6 && /[A-Z]/.test(value) && /[0-9]/.test(value)),
      "Password needs 6+ chars, one uppercase and one number",
    ),
});

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});
