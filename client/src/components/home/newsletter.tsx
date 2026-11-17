"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validators";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("You are on the TourVibe expedition list");
    setEmail("");
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#0B1E3D] px-6 py-10 text-white sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-300">
              07 / Newsletter
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Seasonal departures in your inbox
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Receive new Sajek dates, Sundarbans permit windows, and tea-country
              weekend releases — no spam, only expedition notes.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <div className="flex-1">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border-white/20 bg-white/10 text-white placeholder:text-slate-300"
                required
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              className="bg-white text-[#0B1E3D] hover:bg-slate-100"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
