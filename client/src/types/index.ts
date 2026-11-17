export type { User, UserRole } from "./user";
export type {
  Category,
  Tour,
  TourDifficulty,
  TourFilters,
  TourItineraryDay,
  TourListResponse,
} from "./tour";
export type { Booking, BookingStatus } from "./booking";
export type { Review } from "./review";

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
  errors?: unknown;
}

export interface PublicStats {
  travelers: number;
  tours: number;
  destinations: number;
  satisfaction: number;
}
