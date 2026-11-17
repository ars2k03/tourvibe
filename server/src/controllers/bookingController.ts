import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Booking } from "../models/Booking.js";
import { Tour } from "../models/Tour.js";
import { sendSuccess } from "../utils/apiResponse.js";
import {
  bookingSchema,
  updateBookingStatusSchema,
} from "../utils/validators.js";

export async function createBooking(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = bookingSchema.parse(req.body);
    const tour = await Tour.findById(payload.tourId);

    if (!tour || !tour.isActive) {
      throw new AppError("Tour not found", 404);
    }
    if (payload.guests > tour.maxGuests) {
      throw new AppError(
        `This tour allows a maximum of ${tour.maxGuests} guests`,
        400,
      );
    }

    const discounted =
      tour.price - (tour.price * tour.discountPercent) / 100;
    const totalPrice = Math.round(discounted * payload.guests);

    if (!req.user?.id) {
      throw new AppError("Authentication required", 401);
    }

    const booking = await Booking.create({
      user: req.user.id,
      tour: tour._id,
      guests: payload.guests,
      startDate: payload.startDate,
      totalPrice,
      currency: tour.currency,
      specialRequests: payload.specialRequests,
      status: "pending",
    });

    const populated = await Booking.findById(booking._id)
      .populate("tour", "title coverImage location durationDays")
      .populate("user", "name email");

    sendSuccess(res, { booking: populated }, "Booking created", 201);
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const bookings = await Booking.find({ user: req.user?.id })
      .populate("tour", "title coverImage location durationDays price currency")
      .sort({ createdAt: -1 });
    sendSuccess(res, { bookings });
  } catch (error) {
    next(error);
  }
}

export async function getAllBookings(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const bookings = await Booking.find()
      .populate("tour", "title location")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    sendSuccess(res, { bookings });
  } catch (error) {
    next(error);
  }
}

export async function updateBookingStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = updateBookingStatusSchema.parse(req.body);
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: payload.status },
      { new: true },
    )
      .populate("tour", "title location")
      .populate("user", "name email");

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    sendSuccess(res, { booking }, "Booking status updated");
  } catch (error) {
    next(error);
  }
}

export async function cancelMyBooking(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }
    if (booking.status === "completed") {
      throw new AppError("Completed bookings cannot be cancelled", 400);
    }

    booking.status = "cancelled";
    await booking.save();
    sendSuccess(res, { booking }, "Booking cancelled");
  } catch (error) {
    next(error);
  }
}
