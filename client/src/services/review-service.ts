import type { ApiResponse, Review } from "@/types";
import { apiClient } from "./api-client";

export async function createReviewRequest(payload: {
  tourId: string;
  rating: number;
  title: string;
  comment: string;
}) {
  const { data } = await apiClient.post<ApiResponse<{ review: Review }>>(
    "/reviews",
    payload,
  );
  return data.data.review;
}
