"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Compass, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

const authLinks = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ready = mounted && !loading;
  const links = ready && user ? authLinks : publicLinks;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 h-[72px] border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#0B1E3D] dark:text-white">
          <Compass className="h-5 w-5" />
          TourVibe
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-slate-100 dark:bg-slate-800 text-[#0B1E3D] dark:text-white"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {!ready ? (
            <div className="h-9 w-24 rounded-lg bg-slate-100 dark:bg-slate-800" />
          ) : user ? (
            <Dropdown
              trigger={
                <span className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="max-w-[100px] truncate text-sm font-medium">
                    {user.name.split(" ")[0]}
                  </span>
                </span>
              }
            >
              <DropdownItem onClick={() => router.push("/dashboard/profile")}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => router.push("/dashboard/bookings")}>
                My Bookings
              </DropdownItem>
              <DropdownItem onClick={() => router.push("/dashboard/settings")}>
                Settings
              </DropdownItem>
              {user.role === "admin" ? (
                <DropdownItem onClick={() => router.push("/dashboard/admin/tours")}>
                  Admin Panel
                </DropdownItem>
              ) : null}
              <DropdownItem onClick={() => void handleLogout()} className="text-red-600">
                Logout
              </DropdownItem>
            </Dropdown>
          ) : (
            <>
              <Button variant="ghost" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button onClick={() => router.push("/register")}>Register</Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-lg border border-slate-200 dark:border-slate-700 p-2"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0A0F1D] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
            {ready && user ? (
              <>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="rounded-lg px-3 py-2 text-left text-sm text-red-600"
                  onClick={() => {
                    setMobileOpen(false);
                    void handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : ready ? (
              <div className="mt-2 flex gap-2">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setMobileOpen(false);
                    router.push("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
