import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import type { BookingStatus } from "../types/index.js";

export interface IBooking extends Document {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  guests: number;
  startDate: Date;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  specialRequests: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    guests: { type: Number, required: true, min: 1 },
    startDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "BDT" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    specialRequests: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Booking: Model<IBooking> =
  mongoose.models.Booking ?? mongoose.model<IBooking>("Booking", bookingSchema);
