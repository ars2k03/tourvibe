import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Category } from "../models/Category.js";
import { Tour } from "../models/Tour.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { categorySchema, slugify } from "../utils/validators.js";

export async function getCategories(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const categories = await Category.find().sort({ name: 1 });
    const withCounts = await Promise.all(
      categories.map(async (category) => {
        const tourCount = await Tour.countDocuments({
          category: category._id,
          isActive: true,
        });
        return { ...category.toObject(), tourCount };
      }),
    );
    sendSuccess(res, { categories: withCounts });
  } catch (error) {
    next(error);
  }
}

export async function createCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = categorySchema.parse(req.body);
    const category = await Category.create({
      ...payload,
      slug: slugify(payload.name),
    });
    sendSuccess(res, { category }, "Category created", 201);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = categorySchema.partial().parse(req.body);
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        ...payload,
        ...(payload.name ? { slug: slugify(payload.name) } : {}),
      },
      { new: true, runValidators: true },
    );
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    sendSuccess(res, { category }, "Category updated");
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const linkedTours = await Tour.countDocuments({ category: req.params.id });
    if (linkedTours > 0) {
      throw new AppError(
        "Cannot delete a category that still has tours assigned",
        400,
      );
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    sendSuccess(res, null, "Category deleted");
  } catch (error) {
    next(error);
  }
}
