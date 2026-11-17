import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Success",
  status = 200,
): Response {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  message: string,
  status = 400,
  errors?: unknown,
): Response {
  return res.status(status).json({
    success: false,
    status,
    message,
    errors: errors ?? null,
  });
}
