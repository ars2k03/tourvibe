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
            className={`relative aspect-[16/10] overflow-hidden rounded-xl border ${
              active === index
                ? "border-[#0B1E3D]"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <Image src={image} alt="" fill className="object-cover" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
