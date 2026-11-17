import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Booking } from "../models/Booking.js";
import { Category } from "../models/Category.js";
import { Contact } from "../models/Contact.js";
import { Review } from "../models/Review.js";
import { Tour } from "../models/Tour.js";
import { User } from "../models/User.js";
import { sendSuccess } from "../utils/apiResponse.js";

export async function getAdminDashboard(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const [
      totalUsers,
      totalTours,
      totalBookings,
      revenueAgg,
      recentBookings,
      bookingsByStatus,
      monthlyBookings,
      topTours,
      newContacts,
    ] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Tour.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Booking.aggregate<{ total: number }>([
        { $match: { status: { $in: ["confirmed", "completed"] } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Booking.find()
        .populate("user", "name email")
        .populate("tour", "title")
        .sort({ createdAt: -1 })
        .limit(8),
      Booking.aggregate<{ _id: string; count: number }>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Booking.aggregate<{ _id: { month: number; year: number }; count: number; revenue: number }>([
        {
          $group: {
            _id: {
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" },
            },
            count: { $sum: 1 },
            revenue: { $sum: "$totalPrice" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
        { $limit: 6 },
      ]),
      Tour.find({ isActive: true })
        .sort({ ratingAverage: -1, ratingCount: -1 })
        .limit(5)
        .select("title ratingAverage ratingCount price location"),
      Contact.countDocuments({ status: "new" }),
    ]);

    sendSuccess(res, {
      overview: {
        totalUsers,
        totalTours,
        totalBookings,
        revenue: revenueAgg[0]?.total ?? 0,
        newContacts,
        categories: await Category.countDocuments(),
        reviews: await Review.countDocuments(),
      },
      recentBookings,
      bookingsByStatus,
      monthlyBookings,
      topTours,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserDashboard(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.user?.id;
    const [bookings, reviews, upcoming] = await Promise.all([
      Booking.find({ user: userId })
        .populate("tour", "title coverImage location startDates")
        .sort({ createdAt: -1 }),
      Review.find({ user: userId })
        .populate("tour", "title")
        .sort({ createdAt: -1 })
        .limit(5),
      Booking.find({
        user: userId,
        status: { $in: ["pending", "confirmed"] },
        startDate: { $gte: new Date() },
      })
        .populate("tour", "title coverImage location")
        .sort({ startDate: 1 })
        .limit(3),
    ]);

    const spent = bookings
      .filter((b) => b.status === "confirmed" || b.status === "completed")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    sendSuccess(res, {
      overview: {
        totalBookings: bookings.length,
        upcomingTrips: upcoming.length,
        reviewsWritten: reviews.length,
        totalSpent: spent,
      },
      bookings,
      reviews,
      upcoming,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPublicStats(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const [travelers, tours, destinations, avgRating] = await Promise.all([
      User.countDocuments({ role: "user" }),
      Tour.countDocuments({ isActive: true }),
      Tour.distinct("location"),
      Tour.aggregate<{ avg: number }>([
        { $match: { isActive: true, ratingCount: { $gt: 0 } } },
        { $group: { _id: null, avg: { $avg: "$ratingAverage" } } },
      ]),
    ]);

    sendSuccess(res, {
      stats: {
        travelers: Math.max(travelers, 1280),
        tours,
        destinations: destinations.length,
        satisfaction: Number((avgRating[0]?.avg ?? 4.8).toFixed(1)),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });
    sendSuccess(res, {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        phone: user.phone,
        bio: user.bio,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const role = req.body.role as "user" | "admin";
    if (!["user", "admin"].includes(role)) {
      throw new AppError("Invalid role", 400);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true },
    ).select("-password");
    if (!user) {
      throw new AppError("User not found", 404);
    }
    sendSuccess(res, { user }, "User role updated");
  } catch (error) {
    next(error);
  }
}
