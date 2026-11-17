"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin, Star, Users } from "lucide-react";
import type { Review, Tour } from "@/types";
import { BookingModal } from "@/components/tours/booking-modal";
import { ReviewForm } from "@/components/tours/review-form";
import { TourCard } from "@/components/tours/tour-card";
import { TourGallery } from "@/components/tours/tour-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { discountedPrice, formatDate, formatPrice } from "@/lib/utils";
import { fetchTourById } from "@/services/tour-service";

export default function TourDetailsPage() {
  const params = useParams<{ id: string }>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    fetchTourById(params.id)
      .then((data) => {
        setTour(data.tour);
        setReviews(data.reviews);
        setRelated(data.related);
      })
      .catch(() => {
        setTour(null);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-slate-500">
        Tour not found.
      </div>
    );
  }

  const price = discountedPrice(tour.price, tour.discountPercent);
  const categoryName =
    typeof tour.category === "object" ? tour.category.name : "Tour";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-8">
          <TourGallery images={tour.images} title={tour.title} />
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{categoryName}</Badge>
              <Badge className="bg-amber-100 text-amber-800">{tour.difficulty}</Badge>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
              {tour.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {tour.location}, {tour.country}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                {tour.ratingAverage.toFixed(1)} ({tour.ratingCount})
              </span>
              <span className="inline-flex items-center gap-1 font-mono">
                {tour.durationDays}D / {tour.durationNights}N
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" />
                Max {tour.maxGuests}
              </span>
            </div>
          </div>

          <section>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              {tour.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Highlights</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {tour.highlights.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Inclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {tour.inclusions.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Exclusions</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {tour.exclusions.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Itinerary</h2>
            <div className="mt-4 space-y-3">
              {tour.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
                >
                  <p className="font-mono text-xs text-slate-500">Day {day.day}</p>
                  <h3 className="mt-1 font-semibold">{day.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{day.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Traveler reviews</h2>
            <ReviewForm
              tourId={tour._id}
              onCreated={(review) => setReviews((prev) => [review, ...prev])}
            />
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <article
                    key={review._id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
                  >
                    <div className="flex items-center gap-3">
                      {/* oxlint-disable-next-line nextjs/no-img-element */}
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{review.user.name}</p>
                        <p className="font-mono text-xs text-amber-500">
                          {review.rating}/5 · {formatDate(review.createdAt)}
                        </p>
                      </div>
                    </div>
                    <h3 className="mt-3 font-semibold">{review.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{review.comment}</p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-sm lg:sticky lg:top-24">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            From
          </p>
          <p className="mt-1 font-mono text-3xl font-semibold text-[#0B1E3D] dark:text-white">
            {formatPrice(price, tour.currency)}
          </p>
          {tour.discountPercent > 0 ? (
            <p className="font-mono text-sm text-slate-400 line-through">
              {formatPrice(tour.price, tour.currency)}
            </p>
          ) : null}
          <div className="mt-6 space-y-2 text-sm text-slate-500">
            <p>Upcoming departures:</p>
            {tour.startDates.slice(0, 3).map((date) => (
              <p key={date} className="font-mono text-slate-700 dark:text-slate-200">
                {formatDate(date)}
              </p>
            ))}
          </div>
          <Button className="mt-6 w-full" onClick={() => setBookingOpen(true)}>
            Request booking
          </Button>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Related expeditions</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <TourCard key={item._id} tour={item} />
            ))}
          </div>
        </section>
      ) : null}

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        tour={tour}
      />
    </div>
  );
}
