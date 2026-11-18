"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { DEMO_ADMIN, DEMO_TRAVELER } from "@/lib/demo-credentials";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin settings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Operational defaults for the TourVibe travel desk.
        </p>
      </div>
      <Card className="space-y-4 p-6 text-sm text-slate-600 dark:text-slate-300">
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            Demo traveler login
          </p>
          <p className="mt-1 font-mono text-xs">
            {DEMO_TRAVELER.email} / {DEMO_TRAVELER.password}
          </p>
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            Demo admin login
          </p>
          <p className="mt-1 font-mono text-xs">
            {DEMO_ADMIN.email} / {DEMO_ADMIN.password}
          </p>
        </div>
        <p>
          Booking confirmations are processed manually by the desk within one
          business day. Archived tours remain hidden from public explore views.
          Use the Demo buttons on the login page to auto-fill these credentials.
        </p>
      </Card>
    </div>
  );
}
