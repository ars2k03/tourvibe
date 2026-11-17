"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const slides = [
  {
    title: "Rise above the mist in Sajek",
    subtitle:
      "Guided highland stays with sunrise viewpoints, local hosts, and transparent logistics.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1800&h=1200&fit=crop",
    cta: "Browse hill trails",
    href: "/tours?location=Sajek%20Valley",
  },
  {
    title: "Follow the Bay to Saint Martin's",
    subtitle:
      "Cox's Bazar sunrises, Inani cliffs, and carefully timed island ferries.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&h=1200&fit=crop",
    cta: "Explore coastal escapes",
    href: "/tours?category=",
  },
  {
    title: "Enter the Sundarbans with purpose",
    subtitle:
      "Permit-backed mangrove safaris led by naturalists who put wildlife first.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&h=1200&fit=crop",
    cta: "View wildlife tours",
    href: "/tours",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    const timer = window.setInterval(() => emblaApi.scrollNext(), 6000);
    return () => {
      emblaApi.off("select", onSelect);
      window.clearInterval(timer);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[65vh] min-h-[420px] max-h-[680px] overflow-hidden">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div key={slide.title} className="relative min-w-0 flex-[0_0_100%]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#0B1E3D]/55" />
              <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">
                  TourVibe Expeditions
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <em className="font-serif not-italic font-normal italic text-amber-200">
                    {slide.title.split(" ").slice(-1)}
                  </em>
                </h1>
                <p className="mt-4 max-w-xl text-base text-slate-100 sm:text-lg">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={slide.href}
                    className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0B1E3D] shadow-sm hover:bg-slate-100"
                  >
                    {slide.cta}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Talk to travel desk
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          className="rounded-full bg-white/90 p-2 text-[#0B1E3D]"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          className="rounded-full bg-white/90 p-2 text-[#0B1E3D]"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
