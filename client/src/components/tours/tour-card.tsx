import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";
import type { Tour } from "@/types";
import { Badge } from "@/components/ui/badge";
import { discountedPrice, formatPrice } from "@/lib/utils";

export function TourCard({ tour }: { tour: Tour }) {
  const price = discountedPrice(tour.price, tour.discountPercent);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {tour.discountPercent > 0 ? (
          <Badge className="absolute left-3 top-3 bg-amber-500 text-white">
            -{tour.discountPercent}%
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {tour.location}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            {tour.ratingAverage.toFixed(1)}
          </span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-white">
          {tour.title}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-500">{tour.summary}</p>
        <div className="mt-auto flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-3 text-xs text-slate-500">
          <span className="font-mono">
            {tour.durationDays}D / {tour.durationNights}N
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {tour.maxGuests}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-semibold text-[#0B1E3D] dark:text-white">
              {formatPrice(price, tour.currency)}
            </p>
            {tour.discountPercent > 0 ? (
              <p className="font-mono text-xs text-slate-400 line-through">
                {formatPrice(tour.price, tour.currency)}
              </p>
            ) : null}
          </div>
          <Link
            href={`/tours/${tour._id}`}
            className="rounded-lg bg-[#0B1E3D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#152E59]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
