"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Category, Tour } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import {
  fetchCategories,
  fetchTourById,
  updateTourRequest,
} from "@/services/tour-service";
import { fieldControlClass, selectControlClass } from "@/lib/utils";
import { getErrorMessage } from "@/services/api-client";

export default function EditTourPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
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
    coverImage: "",
    images: "",
    category: "",
    difficulty: "moderate",
    highlights: "",
    inclusions: "",
    exclusions: "",
    isFeatured: false,
  });

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  useEffect(() => {
    async function load() {
      if (!params.id) return;
      try {
        const [cats, detail] = await Promise.all([
          fetchCategories(),
          fetchTourById(params.id),
        ]);
        const tour = detail.tour;
        setCategories(cats);
        setForm({
          title: tour.title,
          summary: tour.summary,
          description: tour.description,
          location: tour.location,
          country: tour.country,
          durationDays: tour.durationDays,
          durationNights: tour.durationNights,
          maxGuests: tour.maxGuests,
          price: tour.price,
          currency: tour.currency,
          discountPercent: tour.discountPercent,
          coverImage: tour.coverImage,
          images: tour.images.join(", "),
          category:
            typeof tour.category === "object"
              ? tour.category._id
              : String(tour.category),
          difficulty: tour.difficulty,
          highlights: tour.highlights.join(", "),
          inclusions: tour.inclusions.join(", "),
          exclusions: tour.exclusions.join(", "),
          isFeatured: tour.isFeatured,
        });
      } catch {
        toast.error("Unable to load tour");
      } finally {
        setBooting(false);
      }
    }
    void load();
  }, [params.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!params.id) return;
    setLoading(true);
    try {
      const payload: Partial<Tour> = {
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
        images: form.images
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        category: form.category,
        difficulty: form.difficulty as Tour["difficulty"],
        highlights: form.highlights.split(",").map((item) => item.trim()),
        inclusions: form.inclusions.split(",").map((item) => item.trim()),
        exclusions: form.exclusions.split(",").map((item) => item.trim()),
        isFeatured: form.isFeatured,
      };
      const tour = await updateTourRequest(params.id, payload);
      toast.success("Tour updated");
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

  if (booting) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit tour</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Update pricing, copy, media, and logistics for this expedition.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input label="Title" value={form.title} onChange={(e) => update("title", e.target.value)} required />
        <Input label="Location" value={form.location} onChange={(e) => update("location", e.target.value)} required />
        <Input label="Summary" value={form.summary} onChange={(e) => update("summary", e.target.value)} required />
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Description
          </label>
          <textarea
            className={fieldControlClass}
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
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Category
          </label>
          <select
            className={selectControlClass}
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
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-1 py-1 text-sm transition-colors duration-200 hover:text-[#0B1E3D] dark:hover:text-amber-300">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#0B1E3D] focus:ring-[#0B1E3D] dark:border-slate-600 dark:focus:ring-amber-400"
            checked={form.isFeatured}
            onChange={(e) => update("isFeatured", e.target.checked)}
          />
          Feature on homepage
        </label>
        <Button type="submit" loading={loading}>
          Save changes
        </Button>
      </form>
    </div>
  );
}
