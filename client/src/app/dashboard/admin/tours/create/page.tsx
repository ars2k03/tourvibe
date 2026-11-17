"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { createTourRequest, fetchCategories } from "@/services/tour-service";
import { getErrorMessage } from "@/services/api-client";

export default function CreateTourPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    location: "",
    country: "Bangladesh",
    durationDays: 3,
    durationNights: 2,
    maxGuests: 12,
    price: 10000,
    currency: "BDT",
    discountPercent: 0,
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&h=900&fit=crop",
    images:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&h=900&fit=crop",
    category: "",
    difficulty: "moderate",
    highlights: "Guided experience, Local cuisine, Scenic viewpoints",
    inclusions: "Transport, Lodging, Breakfast",
    exclusions: "Personal expenses, Insurance",
    isFeatured: false,
  });

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  useEffect(() => {
    fetchCategories()
      .then((items) => {
        setCategories(items);
        if (items[0]) setForm((prev) => ({ ...prev, category: items[0]!._id }));
      })
      .catch(() => setCategories([]));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const tour = await createTourRequest({
        title: form.title,
        summary: form.summary,
        description: form.description,
        location: form.location,
        country: form.country,
        durationDays: form.durationDays,
        durationNights: form.durationNights,
        maxGuests: form.maxGuests,
        price: form.price,
        currency: form.currency,
        discountPercent: form.discountPercent,
        coverImage: form.coverImage,
        images: form.images.split(",").map((item) => item.trim()).filter(Boolean),
        category: form.category,
        difficulty: form.difficulty as "easy" | "moderate" | "challenging",
        highlights: form.highlights.split(",").map((item) => item.trim()),
        inclusions: form.inclusions.split(",").map((item) => item.trim()),
        exclusions: form.exclusions.split(",").map((item) => item.trim()),
        itinerary: [
          {
            day: 1,
            title: "Arrival & orientation",
            description:
              "Meet your guide, settle into lodging, and review the expedition plan.",
          },
        ],
        isFeatured: form.isFeatured,
        isActive: true,
        startDates: [],
      });
      toast.success("Tour created");
      router.push(`/tours/${tour._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create tour</h1>
        <p className="text-sm text-slate-500">
          Publish a new expedition with pricing, media, and logistics.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Title" value={form.title} onChange={(e) => update("title", e.target.value)} required />
        <Input label="Location" value={form.location} onChange={(e) => update("location", e.target.value)} required />
        <Input label="Summary" value={form.summary} onChange={(e) => update("summary", e.target.value)} required />
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Description
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            rows={5}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Days" type="number" value={form.durationDays} onChange={(e) => update("durationDays", Number(e.target.value))} />
          <Input label="Nights" type="number" value={form.durationNights} onChange={(e) => update("durationNights", Number(e.target.value))} />
          <Input label="Max guests" type="number" value={form.maxGuests} onChange={(e) => update("maxGuests", Number(e.target.value))} />
          <Input label="Price" type="number" value={form.price} onChange={(e) => update("price", Number(e.target.value))} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Category
          </label>
          <select
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <Input label="Cover image URL" value={form.coverImage} onChange={(e) => update("coverImage", e.target.value)} />
        <Input label="Gallery image URLs (comma separated)" value={form.images} onChange={(e) => update("images", e.target.value)} />
        <Input label="Highlights (comma separated)" value={form.highlights} onChange={(e) => update("highlights", e.target.value)} />
        <Input label="Inclusions (comma separated)" value={form.inclusions} onChange={(e) => update("inclusions", e.target.value)} />
        <Input label="Exclusions (comma separated)" value={form.exclusions} onChange={(e) => update("exclusions", e.target.value)} />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => update("isFeatured", e.target.checked)}
          />
          Feature on homepage
        </label>
        <Button type="submit" loading={loading}>
          Publish tour
        </Button>
      </form>
    </div>
  );
}
