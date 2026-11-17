import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../types/index.js";
import { AppError } from "./errorMiddleware.js";

export function authorize(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError("You do not have permission for this action", 403));
      return;
    }
    next();
  };
}
