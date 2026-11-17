import type { User } from "./user";

export interface Review {
  _id: string;
  user: Pick<User, "name" | "avatar"> & { _id?: string };
  tour: string | { _id: string; title: string };
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}
