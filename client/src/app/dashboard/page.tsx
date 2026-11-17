"use client";

import { useEffect, useState } from "react";
import { Bookmark, Map, Star, Wallet } from "lucide-react";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { DataTable } from "@/components/dashboard/data-table";
import { useAuth } from "@/hooks/use-auth";
import { formatDate, formatPrice } from "@/lib/utils";
import {
  fetchAdminDashboard,
  fetchUserDashboard,
} from "@/services/dashboard-service";
import type { Booking, Tour } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<Awaited<
    ReturnType<typeof fetchUserDashboard>
  > | null>(null);
  const [adminData, setAdminData] = useState<Awaited<
    ReturnType<typeof fetchAdminDashboard>
  > | null>(null);

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") {
      fetchAdminDashboard().then(setAdminData).catch(() => setAdminData(null));
    } else {
      fetchUserDashboard().then(setUserData).catch(() => setUserData(null));
    }
  }, [user]);

  if (user?.role === "admin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin overview</h1>
          <p className="text-sm text-slate-500">
            Live operations snapshot across travelers, tours, and revenue.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Travelers"
            value={String(adminData?.overview.totalUsers ?? 0)}
            icon={<UsersIcon />}
          />
          <StatCard
            label="Active tours"
            value={String(adminData?.overview.totalTours ?? 0)}
            icon={<Map className="h-4 w-4" />}
          />
          <StatCard
            label="Bookings"
            value={String(adminData?.overview.totalBookings ?? 0)}
            icon={<Bookmark className="h-4 w-4" />}
          />
          <StatCard
            label="Revenue"
            value={formatPrice(adminData?.overview.revenue ?? 0)}
            icon={<Wallet className="h-4 w-4" />}
          />
        </div>
        {adminData ? (
          <AnalyticsCharts
            monthly={adminData.monthlyBookings}
            byStatus={adminData.bookingsByStatus}
          />
        ) : null}
        <DataTable<Booking>
          emptyMessage="No recent bookings"
          rows={adminData?.recentBookings ?? []}
          columns={[
            {
              key: "tour",
              header: "Tour",
              render: (row) =>
                typeof row.tour === "object" ? row.tour.title : "Tour",
            },
            {
              key: "user",
              header: "Traveler",
              render: (row) =>
                typeof row.user === "object" ? row.user.name : "User",
            },
            {
              key: "status",
              header: "Status",
              render: (row) => row.status,
            },
            {
              key: "total",
              header: "Total",
              render: (row) => formatPrice(row.totalPrice, row.currency),
            },
          ]}
        />
        <DataTable<Tour>
          emptyMessage="No tours ranked yet"
          rows={adminData?.topTours ?? []}
          columns={[
            {
              key: "title",
              header: "Top tours",
              render: (row) => row.title,
            },
            {
              key: "location",
              header: "Location",
              render: (row) => row.location,
            },
            {
              key: "rating",
              header: "Rating",
              render: (row) => `${row.ratingAverage} (${row.ratingCount})`,
            },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Hello, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-sm text-slate-500">
          Track upcoming trips, spending, and reviews from one place.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Bookings"
          value={String(userData?.overview.totalBookings ?? 0)}
          icon={<Bookmark className="h-4 w-4" />}
        />
        <StatCard
          label="Upcoming"
          value={String(userData?.overview.upcomingTrips ?? 0)}
          icon={<Map className="h-4 w-4" />}
        />
        <StatCard
          label="Reviews"
          value={String(userData?.overview.reviewsWritten ?? 0)}
          icon={<Star className="h-4 w-4" />}
        />
        <StatCard
          label="Total spent"
          value={formatPrice(userData?.overview.totalSpent ?? 0)}
          icon={<Wallet className="h-4 w-4" />}
        />
      </div>
      <DataTable<Booking>
        emptyMessage="No bookings yet"
        rows={userData?.bookings ?? []}
        columns={[
          {
            key: "tour",
            header: "Tour",
            render: (row) =>
              typeof row.tour === "object" ? row.tour.title : "Tour",
          },
          {
            key: "date",
            header: "Start",
            render: (row) => formatDate(row.startDate),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => row.status,
          },
          {
            key: "total",
            header: "Total",
            render: (row) => formatPrice(row.totalPrice, row.currency),
          },
        ]}
      />
    </div>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
