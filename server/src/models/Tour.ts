import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import type { TourDifficulty } from "../types/index.js";

export interface ITour extends Document {
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  country: string;
  durationDays: number;
  durationNights: number;
  maxGuests: number;
  price: number;
  currency: string;
  discountPercent: number;
  images: string[];
  coverImage: string;
  category: Types.ObjectId;
  difficulty: TourDifficulty;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  ratingAverage: number;
  ratingCount: number;
  isFeatured: boolean;
  isActive: boolean;
  startDates: Date[];
  createdAt: Date;
  updatedAt: Date;
}

const tourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true, default: "Bangladesh" },
    durationDays: { type: Number, required: true, min: 1 },
    durationNights: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "BDT" },
    discountPercent: { type: Number, default: 0, min: 0, max: 80 },
    images: { type: [String], required: true },
    coverImage: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "moderate", "challenging"],
      default: "moderate",
    },
    highlights: { type: [String], default: [] },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    itinerary: {
      type: [
        {
          day: Number,
          title: String,
          description: String,
        },
      ],
      default: [],
    },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0, min: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    startDates: { type: [Date], default: [] },
  },
  { timestamps: true },
);

tourSchema.index({ title: "text", location: "text", summary: "text" });
tourSchema.index({ price: 1, ratingAverage: -1, location: 1 });

export const Tour: Model<ITour> =
  mongoose.models.Tour ?? mongoose.model<ITour>("Tour", tourSchema);
