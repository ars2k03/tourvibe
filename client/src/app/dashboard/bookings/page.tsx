"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { formatDate, formatPrice } from "@/lib/utils";
import {
  cancelBookingRequest,
  fetchMyBookings,
} from "@/services/booking-service";
import { getErrorMessage } from "@/services/api-client";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setBookings(await fetchMyBookings());
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCancel(id: string) {
    try {
      await cancelBookingRequest(id);
      toast.success("Booking cancelled");
      await load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My bookings</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Review status and cancel pending or confirmed trips before departure.
        </p>
      </div>
      {loading ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">Loading bookings...</p>
      ) : (
        <DataTable<Booking>
          rows={bookings}
          columns={[
            {
              key: "tour",
              header: "Tour",
              render: (row) =>
                typeof row.tour === "object" ? row.tour.title : "Tour",
            },
            {
              key: "start",
              header: "Start date",
              render: (row) => formatDate(row.startDate),
            },
            {
              key: "guests",
              header: "Guests",
              render: (row) => row.guests,
            },
            {
              key: "total",
              header: "Total",
              render: (row) => formatPrice(row.totalPrice, row.currency),
            },
            {
              key: "status",
              header: "Status",
              render: (row) => (
                <span className="font-mono text-xs uppercase">{row.status}</span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (row) =>
                row.status === "pending" || row.status === "confirmed" ? (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => void handleCancel(row._id)}
                  >
                    Cancel
                  </Button>
                ) : (
                  "—"
                ),
            },
          ]}
        />
      )}
    </div>
  );
}
