import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { ContactStatus } from "../types/index.js";

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Contact: Model<IContact> =
  mongoose.models.Contact ?? mongoose.model<IContact>("Contact", contactSchema);
