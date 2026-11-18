"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Tour, TourFilters } from "@/types";
import { TourCard } from "@/components/tours/tour-card";
import { TourFiltersPanel } from "@/components/tours/tour-filters";
import { Pagination } from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { fetchCategories, fetchTours } from "@/services/tour-service";

export function ToursExplorer() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<TourFilters>({
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    sort: "newest",
    page: 1,
    limit: 8,
  });
  const debouncedSearch = useDebounce(filters.search ?? "", 400);
  const [tours, setTours] = useState<Tour[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTours({ ...filters, search: debouncedSearch || undefined })
      .then((result) => {
        setTours(result.tours);
        setPages(result.pagination.pages);
      })
      .catch(() => {
        setTours([]);
        setPages(1);
      })
      .finally(() => setLoading(false));
  }, [filters, debouncedSearch]);

  const locations = useMemo(
    () => [
      "Sajek Valley",
      "Cox's Bazar",
      "Sundarbans",
      "Srimangal",
      "Bandarban",
      "Kuakata",
      "Sylhet",
      "Jaflong",
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
          Explore
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          All expeditions
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          Search, filter, and sort guided journeys across Bangladesh with live
          availability and transparent pricing.
        </p>
      </div>

      <TourFiltersPanel
        filters={filters}
        categories={categories}
        locations={locations}
        onChange={setFilters}
      />

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-96" />
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center text-slate-600 dark:text-slate-400">
            No tours match these filters. Try widening your search.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
        <Pagination
          page={filters.page ?? 1}
          pages={pages}
          onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
}
