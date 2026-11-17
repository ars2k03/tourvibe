import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Category: Model<ICategory> =
  mongoose.models.Category ??
  mongoose.model<ICategory>("Category", categorySchema);
