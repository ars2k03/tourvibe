"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";

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
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <section className="bg-[#0B1E3D] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
          04 / Voices
        </p>
        <h2 className="mt-2 text-3xl font-semibold">
          Stories from the <em className="font-serif italic">trail</em>
        </h2>
        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((item) => (
              <article
                key={item.name}
                className="min-w-0 flex-[0_0_100%] rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
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
