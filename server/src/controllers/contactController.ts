import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/errorMiddleware.js";
import { Contact } from "../models/Contact.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { contactSchema } from "../utils/validators.js";

export async function createContact(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const payload = contactSchema.parse(req.body);
    const contact = await Contact.create(payload);
    sendSuccess(
      res,
      { contact },
      "Message received. Our travel desk will reply within 24 hours.",
      201,
    );
  } catch (error) {
    next(error);
  }
}

export async function getContacts(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    sendSuccess(res, { contacts });
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const status = req.body.status as "new" | "read" | "resolved";
    if (!["new", "read", "resolved"].includes(status)) {
      throw new AppError("Invalid contact status", 400);
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!contact) {
      throw new AppError("Contact message not found", 404);
    }
    sendSuccess(res, { contact }, "Contact status updated");
  } catch (error) {
    next(error);
  }
}
