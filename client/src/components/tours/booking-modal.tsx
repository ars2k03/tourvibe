"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { createBookingRequest } from "@/services/booking-service";
import { getErrorMessage } from "@/services/api-client";
import { discountedPrice, formatPrice } from "@/lib/utils";
import type { Tour } from "@/types";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  tour: Tour;
}

export function BookingModal({ open, onClose, tour }: BookingModalProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [guests, setGuests] = useState(2);
  const [startDate, setStartDate] = useState(tour.startDates[0]?.slice(0, 10) ?? "");
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);

  const unit = discountedPrice(tour.price, tour.discountPercent);
  const total = unit * guests;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!user) {
      toast.error("Please login to book this tour");
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      await createBookingRequest({
        tourId: tour._id,
        guests,
        startDate,
        specialRequests,
      });
      toast.success("Booking request submitted");
      onClose();
      router.push("/dashboard/bookings");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to create booking"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Request booking">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p className="text-sm text-slate-500">{tour.title}</p>
        <Input
          label="Guests"
          type="number"
          min={1}
          max={tour.maxGuests}
          value={guests}
          onChange={(event) => setGuests(Number(event.target.value))}
          required
        />
        <Input
          label="Start date"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Special requests
          </label>
          <textarea
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            rows={3}
            value={specialRequests}
            onChange={(event) => setSpecialRequests(event.target.value)}
          />
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900 px-4 py-3 font-mono text-sm">
          Estimated total: {formatPrice(total, tour.currency)}
        </div>
        <Button type="submit" className="w-full" loading={loading}>
          Confirm request
        </Button>
      </form>
    </Modal>
  );
}
