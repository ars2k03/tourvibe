import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
        About TourVibe
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
        Built for thoughtful travel in Bangladesh
      </h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          TourVibe is a Dhaka-based expedition desk specializing in guided journeys
          across Sajek, Bandarban, Cox&apos;s Bazar, the Sundarbans, Srimangal, and
          Sylhet&apos;s border hills. We partner with licensed local guides, lodge
          operators, and conservation-minded vessel crews.
        </p>
        <p>
          Every itinerary publishes clear inclusions, difficulty levels, and
          departure windows. Travelers book through a secure account, track
          confirmations in a personal dashboard, and leave reviews only after a
          confirmed trip — keeping feedback grounded in real experience.
        </p>
        <p>
          Our operations team monitors permits, weather windows, and community
          calendars so that each departure respects both traveler safety and the
          places we visit.
        </p>
      </div>
    </div>
  );
}
