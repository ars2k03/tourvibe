export type TourDifficulty = "easy" | "moderate" | "challenging";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  tourCount?: number;
}

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  country: string;
  durationDays: number;
  durationNights: number;
  maxGuests: number;
  price: number;
  currency: string;
  discountPercent: number;
  images: string[];
  coverImage: string;
  category: Category | string;
  difficulty: TourDifficulty;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: TourItineraryDay[];
  ratingAverage: number;
  ratingCount: number;
  isFeatured: boolean;
  isActive: boolean;
  startDates: string[];
  createdAt?: string;
}

export interface TourListResponse {
  tours: Tour[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TourFilters {
  search?: string;
  category?: string;
  location?: string;
  difficulty?: TourDifficulty;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  featured?: "true" | "false";
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}
