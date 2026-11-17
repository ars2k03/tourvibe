"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { useAuth } from "@/hooks/use-auth";
import { formatPrice } from "@/lib/utils";
import { fetchAdminDashboard } from "@/services/dashboard-service";

export default function AdminReportsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Awaited<
    ReturnType<typeof fetchAdminDashboard>
  > | null>(null);

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  useEffect(() => {
    fetchAdminDashboard().then(setData).catch(() => setData(null));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-slate-500">
          Revenue, booking mix, and engagement indicators for operations review.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(data?.overview.revenue ?? 0)} />
        <StatCard label="Bookings" value={String(data?.overview.totalBookings ?? 0)} />
        <StatCard label="Reviews" value={String(data?.overview.reviews ?? 0)} />
        <StatCard label="New messages" value={String(data?.overview.newContacts ?? 0)} />
      </div>
      {data ? (
        <AnalyticsCharts
          monthly={data.monthlyBookings}
          byStatus={data.bookingsByStatus}
        />
      ) : null}
    </div>
  );
}
