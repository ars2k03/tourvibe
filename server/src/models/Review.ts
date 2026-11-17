import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import { Tour } from "./Tour.js";

export interface IReview extends Document {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  rating: number;
  title: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

async function recalculateTourRating(tourId: Types.ObjectId): Promise<void> {
  const stats = await Review.aggregate<{
    _id: Types.ObjectId;
    ratingAverage: number;
    ratingCount: number;
  }>([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: "$tour",
        ratingAverage: { $avg: "$rating" },
        ratingCount: { $sum: 1 },
      },
    },
  ]);

  if (stats[0]) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: Math.round(stats[0].ratingAverage * 10) / 10,
      ratingCount: stats[0].ratingCount,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: 0,
      ratingCount: 0,
    });
  }
}

reviewSchema.post("save", async function updateTourRating() {
  await recalculateTourRating(this.tour);
});

reviewSchema.post("findOneAndDelete", async function updateAfterDelete(doc) {
  if (doc) {
    await recalculateTourRating(doc.tour);
  }
});

export const Review: Model<IReview> =
  mongoose.models.Review ?? mongoose.model<IReview>("Review", reviewSchema);
