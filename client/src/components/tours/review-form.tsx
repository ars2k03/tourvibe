"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
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
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
    >
      <h3 className="font-semibold">Write a review</h3>
      <Input
        label="Rating (1-5)"
        type="number"
        min={1}
        max={5}
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
        required
      />
      <Input
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <div className="space-y-1.5">
        <label
          htmlFor="review-comment"
          className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
        >
          Comment
        </label>
        <textarea
          id="review-comment"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
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
