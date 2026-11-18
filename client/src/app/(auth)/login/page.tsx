"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema } from "@/lib/validators";
import { getGoogleAuthUrl, getMeRequest } from "@/services/auth-service";
import { getErrorMessage } from "@/services/api-client";
import { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

function LoginFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const token = searchParams.get("token");
    const google = searchParams.get("google");
    if (google === "missing_config") {
      toast.error(
        "Google login needs GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET on the API",
      );
      router.replace("/login");
      return;
    }
    if (google === "success" && token) {
      localStorage.setItem("tourvibe_token", token);
      getMeRequest()
        .then((user) => {
          setUser(user);
          toast.success(`Welcome, ${user.name.split(" ")[0]}`);
          router.replace("/dashboard");
        })
        .catch(() => {
          toast.error("Google login failed");
        });
    }
  }, [searchParams, router, setUser]);

  async function onSubmit(values: LoginForm) {
    try {
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      router.push("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"));
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Sign in to manage bookings and continue planning your next expedition.
      </p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Login
        </Button>
      </form>

      <a
        href={getGoogleAuthUrl()}
        className="mt-3 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-200 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] dark:focus-visible:ring-amber-400"
      >
        Continue with Google
      </a>

      <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">
        New to TourVibe?{" "}
        <Link
          href="/register"
          className="font-semibold text-[#0B1E3D] transition-colors duration-200 hover:text-[#152E59] dark:text-amber-300 dark:hover:text-amber-200 focus-visible:outline-none focus-visible:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16 text-sm text-slate-600 dark:text-slate-400">
          Loading login...
        </div>
      }
    >
      <LoginFormView />
    </Suspense>
  );
}
