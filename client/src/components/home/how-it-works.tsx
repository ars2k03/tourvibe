import { CalendarCheck2, Compass, MessageSquareHeart } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Discover curated routes",
    body: "Filter by hills, coast, wetlands, or tea country and compare transparent pricing.",
  },
  {
    icon: CalendarCheck2,
    title: "Request your dates",
    body: "Pick guests and a start date. Our desk confirms availability within one business day.",
  },
  {
    icon: MessageSquareHeart,
    title: "Travel with local hosts",
    body: "Licensed guides, verified stays, and post-trip reviews keep every expedition accountable.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
          03 / Process
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          How TourVibe works
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6"
          >
            <div className="flex items-center justify-between">
              <step.icon className="h-6 w-6 text-[#0B1E3D] dark:text-amber-300" />
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
