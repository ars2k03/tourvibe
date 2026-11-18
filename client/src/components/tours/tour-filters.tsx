"use client";

import type { Category, TourDifficulty, TourFilters } from "@/types";
import { Input } from "@/components/ui/input";
import { selectControlClass } from "@/lib/utils";

interface TourFiltersProps {
  filters: TourFilters;
  categories: Category[];
  locations: string[];
  onChange: (next: TourFilters) => void;
}

export function TourFiltersPanel({
  filters,
  categories,
  locations,
  onChange,
}: TourFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Input
          label="Search"
          placeholder="Sajek, Sundarbans, tea..."
          value={filters.search ?? ""}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value, page: 1 })
          }
        />
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Category
          </label>
          <select
            className={selectControlClass}
            value={filters.category ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                category: event.target.value || undefined,
                page: 1,
              })
            }
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Location
          </label>
          <select
            className={selectControlClass}
            value={filters.location ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                location: event.target.value || undefined,
                page: 1,
              })
            }
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Sort
          </label>
          <select
            className={selectControlClass}
            value={filters.sort ?? "newest"}
            onChange={(event) =>
              onChange({
                ...filters,
                sort: event.target.value as TourFilters["sort"],
                page: 1,
              })
            }
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Difficulty
          </label>
          <select
            className={selectControlClass}
            value={filters.difficulty ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                difficulty: (event.target.value || undefined) as
                  | TourDifficulty
                  | undefined,
                page: 1,
              })
            }
          >
            <option value="">Any difficulty</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
          </select>
        </div>
        <Input
          label="Min Price (BDT)"
          type="number"
          value={filters.minPrice ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              minPrice: event.target.value
                ? Number(event.target.value)
                : undefined,
              page: 1,
            })
          }
        />
        <Input
          label="Max Price (BDT)"
          type="number"
          value={filters.maxPrice ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              maxPrice: event.target.value
                ? Number(event.target.value)
                : undefined,
              page: 1,
            })
          }
        />
        <Input
          label="Min Rating"
          type="number"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              minRating: event.target.value
                ? Number(event.target.value)
                : undefined,
              page: 1,
            })
          }
        />
      </div>
    </div>
  );
}
