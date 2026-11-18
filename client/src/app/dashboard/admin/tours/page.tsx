"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Tour } from "@/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { formatPrice } from "@/lib/utils";
import { deleteTourRequest, fetchTours } from "@/services/tour-service";
import { getErrorMessage } from "@/services/api-client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function AdminToursPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  async function load() {
    const result = await fetchTours({ limit: 48, sort: "newest" });
    setTours(result.tours);
  }

  useEffect(() => {
    load().catch(() => setTours([]));
  }, []);

  async function handleDelete(id: string) {
    try {
      await deleteTourRequest(id);
      toast.success("Tour archived");
      await load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Manage tours</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Create, review, and archive expedition packages.
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/admin/tours/create")}>
          Create tour
        </Button>
      </div>
      <DataTable<Tour>
        rows={tours}
        columns={[
          { key: "title", header: "Title", render: (row) => row.title },
          { key: "location", header: "Location", render: (row) => row.location },
          {
            key: "price",
            header: "Price",
            render: (row) => formatPrice(row.price, row.currency),
          },
          {
            key: "featured",
            header: "Featured",
            render: (row) => (row.isFeatured ? "Yes" : "No"),
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => router.push(`/tours/${row._id}`)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    router.push(`/dashboard/admin/tours/${row._id}/edit`)
                  }
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => void handleDelete(row._id)}
                >
                  Archive
                </Button>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
