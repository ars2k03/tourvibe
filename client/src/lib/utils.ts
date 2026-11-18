import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const fieldLabelClass =
  "block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400";

export const mutedTextClass = "text-slate-600 dark:text-slate-400";

export const fieldControlClass =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:border-[#0B1E3D] focus:ring-1 focus:ring-[#0B1E3D] dark:focus:border-amber-400 dark:focus:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-60";

export const selectControlClass = cn(
  fieldControlClass,
  "cursor-pointer",
);

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
