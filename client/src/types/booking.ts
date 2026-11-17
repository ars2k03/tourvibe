import type { Tour } from "./tour";
import type { User } from "./user";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Booking {
  _id: string;
  user: User | string;
  tour: Tour | string;
  guests: number;
  startDate: string;
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  specialRequests: string;
  createdAt: string;
}
