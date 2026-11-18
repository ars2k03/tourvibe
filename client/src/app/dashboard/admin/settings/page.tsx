"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

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
      <Card className="space-y-3 p-6 text-sm text-slate-600 dark:text-slate-300">
        <p>
          Demo traveler login: <span className="font-mono">traveler@tourvibe.com</span>
        </p>
        <p>
          Demo admin login: <span className="font-mono">admin@tourvibe.com</span>
        </p>
        <p>
          Booking confirmations are processed manually by the desk within one
          business day. Archived tours remain hidden from public explore views.
        </p>
      </Card>
    </div>
  );
}
