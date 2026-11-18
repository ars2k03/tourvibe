"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema } from "@/lib/validators";
import { getErrorMessage } from "@/services/api-client";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterForm) {
    try {
      await registerUser(values.name, values.email, values.password);
      toast.success("Account created successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "Registration failed"));
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Join TourVibe
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Create a traveler account to book tours and leave verified reviews.
      </p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Full name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Create account
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#0B1E3D] transition-colors duration-200 hover:text-[#152E59] dark:text-amber-300 dark:hover:text-amber-200 focus-visible:outline-none focus-visible:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
