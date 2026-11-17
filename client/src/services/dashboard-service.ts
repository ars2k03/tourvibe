import type { ApiResponse, Booking, PublicStats, Review, Tour, User } from "@/types";
import { apiClient } from "./api-client";

export async function fetchPublicStats() {
  const { data } = await apiClient.get<ApiResponse<{ stats: PublicStats }>>(
    "/dashboard/stats",
  );
  return data.data.stats;
}

export async function fetchUserDashboard() {
  const { data } = await apiClient.get<
    ApiResponse<{
      overview: {
        totalBookings: number;
        upcomingTrips: number;
        reviewsWritten: number;
        totalSpent: number;
      };
      bookings: Booking[];
      reviews: Review[];
      upcoming: Booking[];
    }>
  >("/dashboard/me");
  return data.data;
}

export async function fetchAdminDashboard() {
  const { data } = await apiClient.get<
    ApiResponse<{
      overview: {
        totalUsers: number;
        totalTours: number;
        totalBookings: number;
        revenue: number;
        newContacts: number;
        categories: number;
        reviews: number;
      };
      recentBookings: Booking[];
      bookingsByStatus: { _id: string; count: number }[];
      monthlyBookings: {
        _id: { month: number; year: number };
        count: number;
        revenue: number;
      }[];
      topTours: Tour[];
    }>
  >("/dashboard/admin");
  return data.data;
}

export async function fetchUsers() {
  const { data } = await apiClient.get<ApiResponse<{ users: User[] }>>(
    "/dashboard/users",
  );
  return data.data.users;
}

export async function updateUserRoleRequest(id: string, role: User["role"]) {
  const { data } = await apiClient.patch<ApiResponse<{ user: User }>>(
    `/dashboard/users/${id}/role`,
    { role },
  );
  return data.data.user;
}

export async function submitContact(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { data } = await apiClient.post("/contact", payload);
  return data;
}

export async function createCategoryRequest(payload: {
  name: string;
  description: string;
  image: string;
}) {
  const { data } = await apiClient.post("/categories", payload);
  return data.data.category;
}

export async function deleteCategoryRequest(id: string) {
  await apiClient.delete(`/categories/${id}`);
}
