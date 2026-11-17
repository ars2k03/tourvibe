import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "BDT"): string {
  if (currency === "BDT") {
    return `BDT ${amount.toLocaleString("en-BD")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function discountedPrice(
  price: number,
  discountPercent: number,
): number {
  return Math.round(price - (price * discountPercent) / 100);
}

export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
