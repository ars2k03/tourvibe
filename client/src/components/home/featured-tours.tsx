"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Tour } from "@/types";
import { TourCard } from "@/components/tours/tour-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchFeaturedTours } from "@/services/tour-service";

export function FeaturedTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedTours()
      .then(setTours)
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0A0F1D] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
              02 / Featured
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
              Expeditions travelers book first
            </h2>
          </div>
          <Link
            href="/tours"
            className="text-sm font-semibold text-[#0B1E3D] transition-colors duration-200 hover:text-[#152E59] dark:text-amber-300 dark:hover:text-amber-200 focus-visible:outline-none focus-visible:underline"
          >
            View all tours →
          </Link>
        </div>
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-96" />
            ))}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tours.slice(0, 4).map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
