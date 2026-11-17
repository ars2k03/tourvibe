import type { NextFunction, Request, Response } from "express";
import { User } from "../models/User.js";
import { verifyToken } from "../utils/token.js";
import { AppError } from "./errorMiddleware.js";

export async function protect(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const header = req.headers.authorization;
    const cookieToken =
      typeof req.cookies?.token === "string" ? req.cookies.token : undefined;
    const token = header?.startsWith("Bearer ")
      ? header.slice(7)
      : cookieToken;

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const payload = verifyToken(token);
    const user = await User.findById(payload.id).select("_id role");

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError("Invalid or expired token", 401));
  }
}
