import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Booking } from "../models/Booking.js";
import { Review } from "../models/Review.js";
import { Tour } from "../models/Tour.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { reviewSchema } from "../utils/validators.js";

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = reviewSchema.parse(req.body);
    const tour = await Tour.findById(payload.tourId);
    if (!tour || !tour.isActive) {
      throw new AppError("Tour not found", 404);
    }

    const hasBooking = await Booking.findOne({
      user: req.user?.id,
      tour: payload.tourId,
      status: { $in: ["confirmed", "completed"] },
    });

    if (!hasBooking) {
      throw new AppError(
        "Only travelers with a confirmed booking can leave a review",
        403,
      );
    }

    if (!req.user?.id) {
      throw new AppError("Authentication required", 401);
    }

    const review = await Review.create({
      user: req.user.id,
      tour: payload.tourId,
      rating: payload.rating,
      title: payload.title,
      comment: payload.comment,
    });

    const populated = await Review.findById(review._id).populate(
      "user",
      "name avatar",
    );
    sendSuccess(res, { review: populated }, "Review submitted", 201);
  } catch (error) {
    next(error);
  }
}

export async function getTourReviews(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const reviews = await Review.find({ tour: req.params.tourId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });
    sendSuccess(res, { reviews });
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    const isOwner = review.user.toString() === req.user?.id;
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) {
      throw new AppError("Not authorized to delete this review", 403);
    }

    await review.deleteOne();
    sendSuccess(res, null, "Review deleted");
  } catch (error) {
    next(error);
  }
}
