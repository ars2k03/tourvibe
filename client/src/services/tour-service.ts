import type {
  ApiResponse,
  Category,
  Review,
  Tour,
  TourFilters,
  TourListResponse,
} from "@/types";
import { apiClient } from "./api-client";

export async function fetchTours(filters: TourFilters = {}) {
  const { data } = await apiClient.get<ApiResponse<TourListResponse>>("/tours", {
    params: filters,
  });
  return data.data;
}

export async function fetchFeaturedTours() {
  const { data } = await apiClient.get<ApiResponse<{ tours: Tour[] }>>(
    "/tours/featured",
  );
  return data.data.tours;
}

export async function fetchTourById(id: string) {
  const { data } = await apiClient.get<
    ApiResponse<{ tour: Tour; reviews: Review[]; related: Tour[] }>
  >(`/tours/${id}`);
  return data.data;
}

export async function fetchCategories() {
  const { data } = await apiClient.get<ApiResponse<{ categories: Category[] }>>(
    "/categories",
  );
  return data.data.categories;
}

export async function createTourRequest(payload: Partial<Tour>) {
  const { data } = await apiClient.post<ApiResponse<{ tour: Tour }>>(
    "/tours",
    payload,
  );
  return data.data.tour;
}

export async function updateTourRequest(id: string, payload: Partial<Tour>) {
  const { data } = await apiClient.patch<ApiResponse<{ tour: Tour }>>(
    `/tours/${id}`,
    payload,
  );
  return data.data.tour;
}

export async function deleteTourRequest(id: string) {
  const { data } = await apiClient.delete<ApiResponse<{ tour: Tour }>>(
    `/tours/${id}`,
  );
  return data.data.tour;
}
