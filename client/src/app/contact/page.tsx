"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fieldControlClass } from "@/lib/utils";
import { contactSchema } from "@/lib/validators";
import { getErrorMessage } from "@/services/api-client";
import { submitContact } from "@/services/dashboard-service";

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactForm) {
    try {
      await submitContact(values);
      toast.success("Message received. We will reply within 24 hours.");
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to send message"));
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 sm:px-6 lg:px-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          Speak with the travel desk
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Planning a corporate offsite, private Sundarbans charter, or a family
          highland weekend? Send details and we will respond with availability.
        </p>
        <div className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <p>Level 5, Gulshan Avenue, Dhaka 1212</p>
          <p>
            <a
              href="tel:+8801711001122"
              className="transition-colors duration-200 hover:text-[#0B1E3D] dark:hover:text-amber-300 focus-visible:outline-none focus-visible:underline"
            >
              +880 1711-001122
            </a>
          </p>
          <p>
            <a
              href="mailto:hello@tourvibe.com"
              className="transition-colors duration-200 hover:text-[#0B1E3D] dark:hover:text-amber-300 focus-visible:outline-none focus-visible:underline"
            >
              hello@tourvibe.com
            </a>
          </p>
          <p>Desk hours: Sat–Thu, 10:00–19:00</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6"
      >
        <Input label="Name" error={errors.name?.message} {...register("name")} />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Subject"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <div className="space-y-1.5">
          <label
            htmlFor="contact-message"
            className="block cursor-pointer text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            className={fieldControlClass}
            rows={5}
            {...register("message")}
          />
          {errors.message ? (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          ) : null}
        </div>
        <Button type="submit" loading={isSubmitting} className="w-full">
          Send message
        </Button>
      </form>
    </div>
  );
}
