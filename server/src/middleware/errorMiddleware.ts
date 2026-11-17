import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { sendError } from "../utils/apiResponse.js";

export class AppError extends Error {
  statusCode: number;
  errors?: unknown;

  constructor(message: string, statusCode = 400, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export function notFoundHandler(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new AppError("Route not found", 404));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof ZodError) {
    return sendError(
      res,
      "Validation failed",
      400,
      err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    );
  }

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode, err.errors);
  }

  if (err && typeof err === "object" && "code" in err && err.code === 11000) {
    return sendError(res, "Duplicate entry already exists", 409);
  }

  const message =
    err instanceof Error ? err.message : "Internal server error";
  return sendError(res, message, 500);
}
