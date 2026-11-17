"use client";

import { useEffect, useState } from "react";
import type { PublicStats } from "@/types";
import { fetchPublicStats } from "@/services/dashboard-service";

const defaults: PublicStats = {
  travelers: 1280,
  tours: 8,
  destinations: 8,
  satisfaction: 4.8,
};

export function DynamicStats() {
  const [stats, setStats] = useState<PublicStats>(defaults);

  useEffect(() => {
    fetchPublicStats()
      .then(setStats)
      .catch(() => setStats(defaults));
  }, []);

  const items = [
    { label: "Travelers hosted", value: stats.travelers.toLocaleString() },
    { label: "Active tours", value: String(stats.tours) },
    { label: "Destinations", value: String(stats.destinations) },
    { label: "Avg. satisfaction", value: `${stats.satisfaction}/5` },
  ];

  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => (
          <div key={item.label} className="text-center lg:text-left">
            <p className="font-mono text-3xl font-semibold text-[#0B1E3D] dark:text-white">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
