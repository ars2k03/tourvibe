import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Tour } from "../models/Tour.js";
import { Review } from "../models/Review.js";
import { sendSuccess } from "../utils/apiResponse.js";
import {
  createTourSchema,
  slugify,
  tourQuerySchema,
  updateTourSchema,
} from "../utils/validators.js";

export async function getTours(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const query = tourQuerySchema.parse(req.query);
    const filter: Record<string, unknown> = { isActive: true };

    if (query.search) {
      filter.$text = { $search: query.search };
    }
    if (query.category) filter.category = query.category;
    if (query.location) {
      filter.location = { $regex: query.location, $options: "i" };
    }
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.featured === "true") filter.isFeatured = true;
    if (query.minRating) filter.ratingAverage = { $gte: query.minRating };

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      const price: Record<string, number> = {};
      if (query.minPrice !== undefined) price.$gte = query.minPrice;
      if (query.maxPrice !== undefined) price.$lte = query.maxPrice;
      filter.price = price;
    }

    const sortMap = {
      "price-asc": { price: 1 as const },
      "price-desc": { price: -1 as const },
      rating: { ratingAverage: -1 as const },
      newest: { createdAt: -1 as const },
    };

    const skip = (query.page - 1) * query.limit;
    const [tours, total] = await Promise.all([
      Tour.find(filter)
        .populate("category", "name slug")
        .sort(sortMap[query.sort])
        .skip(skip)
        .limit(query.limit),
      Tour.countDocuments(filter),
    ]);

    sendSuccess(res, {
      tours,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        pages: Math.ceil(total / query.limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTourById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tour = await Tour.findById(req.params.id).populate(
      "category",
      "name slug description",
    );
    if (!tour || !tour.isActive) {
      throw new AppError("Tour not found", 404);
    }

    const reviews = await Review.find({ tour: tour._id })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .limit(20);

    const related = await Tour.find({
      _id: { $ne: tour._id },
      category: tour.category,
      isActive: true,
    })
      .limit(4)
      .select(
        "title slug coverImage price currency durationDays durationNights location ratingAverage ratingCount",
      );

    sendSuccess(res, { tour, reviews, related });
  } catch (error) {
    next(error);
  }
}

export async function createTour(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = createTourSchema.parse(req.body);
    const slug = slugify(payload.title);
    const tour = await Tour.create({ ...payload, slug });
    sendSuccess(res, { tour }, "Tour created", 201);
  } catch (error) {
    next(error);
  }
}

export async function updateTour(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = updateTourSchema.parse(req.body);
    const updateData = {
      ...payload,
      ...(payload.title ? { slug: slugify(payload.title) } : {}),
    };

    const tour = await Tour.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      throw new AppError("Tour not found", 404);
    }

    sendSuccess(res, { tour }, "Tour updated");
  } catch (error) {
    next(error);
  }
}

export async function deleteTour(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!tour) {
      throw new AppError("Tour not found", 404);
    }
    sendSuccess(res, { tour }, "Tour archived");
  } catch (error) {
    next(error);
  }
}

export async function getFeaturedTours(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const tours = await Tour.find({ isFeatured: true, isActive: true })
      .populate("category", "name slug")
      .sort({ ratingAverage: -1 })
      .limit(8);
    sendSuccess(res, { tours });
  } catch (error) {
    next(error);
  }
}
