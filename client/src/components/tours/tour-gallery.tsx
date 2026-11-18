"use client";

import Image from "next/image";
import { useState } from "react";

export function TourGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <Image
          src={current}
          alt={`${title} gallery image ${active + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show gallery image ${index + 1}`}
            aria-pressed={active === index}
            className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] dark:focus-visible:ring-amber-400 ${
              active === index
                ? "border-[#0B1E3D] ring-1 ring-[#0B1E3D] dark:border-amber-400 dark:ring-amber-400"
                : "border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500"
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition duration-300 hover:scale-105"
              sizes="120px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
