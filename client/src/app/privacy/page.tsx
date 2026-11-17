import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Privacy Policy
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          TourVibe collects account details, booking preferences, and contact
          messages solely to operate expeditions and customer support.
        </p>
        <p>
          Passwords are hashed with bcrypt. Authentication uses short-lived JWT
          tokens. We do not sell personal data to third-party advertisers.
        </p>
        <p>
          Booking and review records are retained to fulfill trip obligations and
          maintain platform integrity. You may request profile updates or account
          clarifications via hello@tourvibe.com.
        </p>
        <p>Last updated: 17 November 2026.</p>
      </div>
    </div>
  );
}
