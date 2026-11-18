"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { User } from "@/types";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/data-table";
import { useAuth } from "@/hooks/use-auth";
import { fetchUsers, updateUserRoleRequest } from "@/services/dashboard-service";
import { getErrorMessage } from "@/services/api-client";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  async function load() {
    setUsers(await fetchUsers());
  }

  useEffect(() => {
    load().catch(() => setUsers([]));
  }, []);

  async function toggleRole(target: User) {
    try {
      const nextRole = target.role === "admin" ? "user" : "admin";
      await updateUserRoleRequest(target.id, nextRole);
      toast.success(`Role updated to ${nextRole}`);
      await load();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Manage users</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Review traveler accounts and promote trusted operators to admin.
        </p>
      </div>
      <DataTable<User & { _id?: string }>
        rows={users.map((item) => ({ ...item, _id: item.id }))}
        columns={[
          { key: "name", header: "Name", render: (row) => row.name },
          { key: "email", header: "Email", render: (row) => row.email },
          {
            key: "role",
            header: "Role",
            render: (row) => (
              <span className="font-mono text-xs uppercase">{row.role}</span>
            ),
          },
          {
            key: "actions",
            header: "Actions",
            render: (row) => (
              <Button size="sm" variant="secondary" onClick={() => void toggleRole(row)}>
                Make {row.role === "admin" ? "user" : "admin"}
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
