import type { ApiResponse, User } from "@/types";
import { apiClient } from "./api-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function loginRequest(email: string, password: string) {
  const { data } = await apiClient.post<
    ApiResponse<{ user: User; token: string }>
  >("/auth/login", { email, password });
  return data.data;
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
) {
  const { data } = await apiClient.post<
    ApiResponse<{ user: User; token: string }>
  >("/auth/register", { name, email, password });
  return data.data;
}

export async function logoutRequest() {
  await apiClient.post("/auth/logout");
}

export async function getMeRequest() {
  const { data } = await apiClient.get<ApiResponse<{ user: User }>>("/auth/me");
  return data.data.user;
}

export async function updateProfileRequest(payload: {
  name?: string;
  phone?: string;
  bio?: string;
  password?: string;
  avatar?: string;
}) {
  const { data } = await apiClient.patch<ApiResponse<{ user: User }>>(
    "/auth/profile",
    payload,
  );
  return data.data.user;
}

export async function updateProfileFormRequest(formData: FormData) {
  const { data } = await apiClient.patch<ApiResponse<{ user: User }>>(
    "/auth/profile",
    formData,
  );
  return data.data.user;
}

export async function getDemoCredentials() {
  const { data } = await apiClient.get<
    ApiResponse<{
      admin: { email: string; password: string };
      user: { email: string; password: string };
      googleEnabled?: boolean;
    }>
  >("/auth/demo");
  return data.data;
}

export function getGoogleAuthUrl(): string {
  return `${API_URL}/auth/google`;
}
