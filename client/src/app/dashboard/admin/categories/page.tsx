"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/dashboard/data-table";
import { useAuth } from "@/hooks/use-auth";
import { fetchCategories } from "@/services/tour-service";
import {
  createCategoryRequest,
  deleteCategoryRequest,
} from "@/services/dashboard-service";
import { getErrorMessage } from "@/services/api-client";

export default function AdminCategoriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
  });

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  async function load() {
    setCategories(await fetchCategories());
  }

  useEffect(() => {
    load().catch(() => setCategories([]));
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    try {
      await createCategoryRequest(form);
      toast.success("Category created");
      setForm((prev) => ({ ...prev, name: "", description: "" }));
      await load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteCategoryRequest(id);
      toast.success("Category deleted");
      await load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Categories</h1>
        <p className="text-sm text-slate-500">
          Organize expeditions into destination lanes travelers can browse.
        </p>
      </div>
      <form
        onSubmit={handleCreate}
        className="grid gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:grid-cols-2"
      >
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          label="Image URL"
          value={form.image}
          onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
          required
        />
        <div className="md:col-span-2">
          <Input
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          />
        </div>
        <Button type="submit">Add category</Button>
      </form>
      <DataTable<Category>
        rows={categories}
        columns={[
          { key: "name", header: "Name", render: (row) => row.name },
          {
            key: "tours",
            header: "Tours",
            render: (row) => row.tourCount ?? 0,
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <Button
                size="sm"
                variant="danger"
                onClick={() => void handleDelete(row._id)}
              >
                Delete
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
