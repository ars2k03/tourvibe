"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Are prices per person?",
    a: "Yes. Listed prices are per traveler unless a tour page notes a private charter. Group discounts appear as percentage badges when available.",
  },
  {
    q: "How fast are bookings confirmed?",
    a: "Most requests are confirmed within one business day after our travel desk verifies lodge and permit availability for your dates.",
  },
  {
    q: "Can I cancel after requesting a booking?",
    a: "Pending and confirmed bookings can be cancelled from your dashboard before the trip start date. Completed trips cannot be cancelled.",
  },
  {
    q: "Do you arrange transport from Dhaka?",
    a: "Many packages include AC transport or ferry tickets. Each tour page lists inclusions clearly so you know what is covered.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0A0F1D] py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
          06 / FAQ
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Answers before you pack
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B1E3D] dark:focus-visible:ring-amber-400 rounded-2xl"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-600 dark:text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <p className="border-t border-slate-200 dark:border-slate-800 px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
