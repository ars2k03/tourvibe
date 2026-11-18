"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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

const AUTH_TOAST_ID = "auth-welcome";
let googleCallbackToken: string | null = null;

function LoginFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setUser } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

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
        { id: "auth-google-config" },
      );
      router.replace("/login");
      return;
    }

    if (google !== "success" || !token) return;
    if (googleCallbackToken === token) return;
    googleCallbackToken = token;

    setOauthLoading(true);
    window.history.replaceState(null, "", "/login");

    void (async () => {
      try {
        localStorage.setItem("tourvibe_token", token);
        const user = await getMeRequest();
        setUser(user);
        toast.success(`Welcome, ${user.name.split(" ")[0]}`, {
          id: AUTH_TOAST_ID,
        });
        router.replace("/dashboard");
      } catch {
        localStorage.removeItem("tourvibe_token");
        googleCallbackToken = null;
        setOauthLoading(false);
        toast.error("Google sign-in failed. Please try again.", {
          id: AUTH_TOAST_ID,
        });
        router.replace("/login");
      }
    })();
  }, [searchParams, router, setUser]);

  async function onSubmit(values: LoginForm) {
    try {
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`, {
        id: AUTH_TOAST_ID,
      });
      router.replace("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error, "Login failed"), {
        id: AUTH_TOAST_ID,
      });
    }
  }

  function continueWithGoogle() {
    if (googleLoading || oauthLoading) return;
    setGoogleLoading(true);
    window.location.assign(getGoogleAuthUrl());
  }

  if (oauthLoading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#0B1E3D] border-r-transparent dark:border-amber-400 dark:border-r-transparent" />
        <h1 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
          Signing you in
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Completing Google authentication and preparing your dashboard.
        </p>
      </div>
    );
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
        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          disabled={googleLoading}
        >
          Login
        </Button>
      </form>

      <Button
        type="button"
        variant="secondary"
        className="mt-3 w-full"
        loading={googleLoading}
        disabled={isSubmitting}
        onClick={continueWithGoogle}
      >
        {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
      </Button>

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
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#0B1E3D] border-r-transparent dark:border-amber-400 dark:border-r-transparent" />
        </div>
      }
    >
      <LoginFormView />
    </Suspense>
  );
}
