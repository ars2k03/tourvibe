"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { cn, fieldControlClass } from "@/lib/utils";
import { getErrorMessage } from "@/services/api-client";
import { createReviewRequest } from "@/services/review-service";
import type { Review } from "@/types";

export function ReviewForm({
  tourId,
  onCreated,
}: {
  tourId: string;
  onCreated: (review: Review) => void;
}) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-600 dark:text-slate-400">
        Login with a confirmed booking to leave a review.
      </p>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const review = await createReviewRequest({
        tourId,
        rating,
        title,
        comment,
      });
      onCreated(review);
      setTitle("");
      setComment("");
      setRating(5);
      toast.success("Review submitted");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to submit review"));
    } finally {
      setLoading(false);
    }
  }

  const activeRating = hovered || rating;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
    >
      <h3 className="font-semibold">Write a review</h3>
      <div className="space-y-1.5">
        <p className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          Rating
        </p>
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHovered(0)}
          role="radiogroup"
          aria-label="Rating"
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            const filled = value <= activeRating;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
                onMouseEnter={() => setHovered(value)}
                onClick={() => setRating(value)}
                className="cursor-pointer rounded p-0.5 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] dark:focus-visible:ring-amber-400"
              >
                <Star
                  className={cn(
                    "h-5 w-5 transition-colors duration-150",
                    filled
                      ? "fill-amber-500 text-amber-500"
                      : "text-slate-300 dark:text-slate-600",
                  )}
                />
              </button>
            );
          })}
          <span className="ml-2 font-mono text-xs text-slate-600 dark:text-slate-400">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <Input
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <div className="space-y-1.5">
        <label
          htmlFor="review-comment"
          className="block cursor-pointer text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
        >
          Comment
        </label>
        <textarea
          id="review-comment"
          className={fieldControlClass}
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
        />
      </div>
      <Button type="submit" loading={loading}>
        Submit review
      </Button>
    </form>
  );
}
