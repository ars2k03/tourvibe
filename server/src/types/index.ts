export type UserRole = "user" | "admin";

export type TourDifficulty = "easy" | "moderate" | "challenging";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type ContactStatus = "new" | "read" | "resolved";

export interface AuthTokenPayload {
  id: string;
  role: UserRole;
}
