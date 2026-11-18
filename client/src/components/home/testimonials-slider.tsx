"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback } from "react";

const testimonials = [
  {
    name: "Arif Hasan",
    tour: "Sajek Valley Mist Ridge",
    quote:
      "Konglak sunrise felt cinematic and the Dhaka pickup was exactly on time. This is how highland travel should feel.",
    rating: 5,
  },
  {
    name: "Maliha Chowdhury",
    tour: "Sundarbans Tiger Trail",
    quote:
      "The naturalist never rushed wildlife moments. We learned more about mangroves in three days than years of casual reading.",
    rating: 5,
  },
  {
    name: "Farhana Akter",
    tour: "Srimangal Tea Immersion",
    quote:
      "Seven-layer tea workshop and Lawachara walk were perfectly paced. Ideal for a restorative long weekend.",
    rating: 5,
  },
];

export function TestimonialsSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[#0B1E3D] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
              04 / Voices
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Stories from the <em className="font-serif italic">trail</em>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={scrollPrev}
              className="cursor-pointer rounded-full border border-white/20 bg-white/5 p-2 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={scrollNext}
              className="cursor-pointer rounded-full border border-white/20 bg-white/5 p-2 text-white transition-colors duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="min-w-0 flex-[0_0_100%] rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:bg-white/[0.08] sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
              >
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-100">
                  “{item.quote}”
                </p>
                <p className="mt-6 text-sm font-semibold">{item.name}</p>
                <p className="font-mono text-xs text-slate-300">{item.tour}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
