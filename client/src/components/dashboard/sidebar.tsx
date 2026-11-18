"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bookmark,
  FolderTree,
  LayoutDashboard,
  Map,
  Settings,
  Shield,
  Users,
  UserRound,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/bookings", label: "My Bookings", icon: Bookmark },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const adminLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/tours", label: "Manage Tours", icon: Map },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
  { href: "/dashboard/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/dashboard/admin/settings", label: "Admin Settings", icon: Shield },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-3 lg:w-64 lg:shrink-0">
      <p className="px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
        {user?.role === "admin" ? "Admin" : "Traveler"} menu
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] focus-visible:ring-offset-2 dark:focus-visible:ring-amber-400",
                active
                  ? "bg-[#0B1E3D] text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
