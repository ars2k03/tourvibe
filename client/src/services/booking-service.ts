import type { ApiResponse, Booking } from "@/types";
import { apiClient } from "./api-client";

export async function createBookingRequest(payload: {
  tourId: string;
  guests: number;
  startDate: string;
  specialRequests?: string;
}) {
  const { data } = await apiClient.post<ApiResponse<{ booking: Booking }>>(
    "/bookings",
    payload,
  );
  return data.data.booking;
}

export async function fetchMyBookings() {
  const { data } = await apiClient.get<ApiResponse<{ bookings: Booking[] }>>(
    "/bookings/mine",
  );
  return data.data.bookings;
}

export async function cancelBookingRequest(id: string) {
  const { data } = await apiClient.patch<ApiResponse<{ booking: Booking }>>(
    `/bookings/${id}/cancel`,
  );
  return data.data.booking;
}

export async function fetchAllBookings() {
  const { data } = await apiClient.get<ApiResponse<{ bookings: Booking[] }>>(
    "/bookings",
  );
  return data.data.bookings;
}

export async function updateBookingStatusRequest(
  id: string,
  status: Booking["status"],
) {
  const { data } = await apiClient.patch<ApiResponse<{ booking: Booking }>>(
    `/bookings/${id}/status`,
    { status },
  );
  return data.data.booking;
}
