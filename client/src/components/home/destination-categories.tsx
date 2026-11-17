"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/types";
import { fetchCategories } from "@/services/tour-service";
import { Skeleton } from "@/components/ui/skeleton";

export function DestinationCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
          01 / Destinations
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Choose your next <em className="font-serif italic">horizon</em>
        </h2>
        <p className="mt-3 text-slate-500">
          Four curated lanes across Bangladesh — hills, coast, wetlands, and tea
          country — each with guided itineraries and local expertise.
        </p>
      </div>
      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/tours?category=${category._id}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#0B1E3D]/45" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-200">
                    {category.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-amber-200">
                    {category.tourCount ?? 0} tours
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
