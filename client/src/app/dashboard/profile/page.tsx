"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { profileSchema } from "@/lib/validators";
import { getErrorMessage } from "@/services/api-client";
import { updateProfileFormRequest } from "@/services/auth-service";

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        bio: user.bio,
        password: "",
      });
      setPreview(user.avatar);
    }
  }, [user, reset]);

  async function onSubmit(values: ProfileForm) {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.phone) formData.append("phone", values.phone);
      if (values.bio) formData.append("bio", values.bio);
      if (values.password) formData.append("password", values.password);
      if (avatarFile) formData.append("avatar", avatarFile);

      const updated = await updateProfileFormRequest(formData);
      setUser(updated);
      setAvatarFile(null);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-slate-500">
          Update traveler details, password, and profile photo.
        </p>
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
        {/* oxlint-disable-next-line nextjs/no-img-element */}
        <img
          src={preview ?? user?.avatar}
          alt={user?.name}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-sm text-slate-500">{user?.email}</p>
          <p className="font-mono text-xs uppercase text-amber-600">{user?.role}</p>
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1.5">
          <label
            htmlFor="avatar"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Profile image
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setAvatarFile(file);
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />
        </div>
        <Input label="Name" error={errors.name?.message} {...register("name")} />
        <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
        <div className="space-y-1.5">
          <label
            htmlFor="bio"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
          >
            Bio
          </label>
          <textarea
            id="bio"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            rows={4}
            {...register("bio")}
          />
        </div>
        <Input
          label="New password (optional)"
          type="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" loading={isSubmitting}>
          Save changes
        </Button>
      </form>
    </div>
  );
}
