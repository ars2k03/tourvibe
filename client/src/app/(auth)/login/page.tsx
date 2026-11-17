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
import {
  getDemoCredentials,
  getGoogleAuthUrl,
  getMeRequest,
} from "@/services/auth-service";
import { getErrorMessage } from "@/services/api-client";
import { z } from "zod";

type LoginForm = z.infer<typeof loginSchema>;

function LoginFormView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, setUser } = useAuth();
  const [demo, setDemo] = useState<{
    admin: { email: string; password: string };
    user: { email: string; password: string };
    googleEnabled?: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    getDemoCredentials()
      .then(setDemo)
      .catch(() => setDemo(null));
  }, []);

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
      <p className="mt-2 text-sm text-slate-500">
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
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800"
      >
        Continue with Google
      </a>
      {demo && !demo.googleEnabled ? (
        <p className="mt-2 text-xs text-slate-500">
          Google OAuth activates when `GOOGLE_CLIENT_ID` and
          `GOOGLE_CLIENT_SECRET` are set on the API.
        </p>
      ) : null}

      {demo ? (
        <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Demo login
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setValue("email", demo.user.email);
                setValue("password", demo.user.password);
              }}
            >
              Traveler demo
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setValue("email", demo.admin.email);
                setValue("password", demo.admin.password);
              }}
            >
              Admin demo
            </Button>
          </div>
        </div>
      ) : null}

      <p className="mt-6 text-sm text-slate-500">
        New to TourVibe?{" "}
        <Link href="/register" className="font-semibold text-[#0B1E3D] dark:text-amber-300">
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
        <div className="mx-auto max-w-md px-4 py-16 text-sm text-slate-500">
          Loading login...
        </div>
      }
    >
      <LoginFormView />
    </Suspense>
  );
}
