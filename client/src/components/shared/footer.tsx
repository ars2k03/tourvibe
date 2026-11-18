import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { TourVibeLogo } from "@/components/shared/tourvibe-logo";

const links = [
  { href: "/tours", label: "Explore Tours" },
  { href: "/about", label: "About TourVibe" },
  { href: "/blog", label: "Travel Journal" },
  { href: "/contact", label: "Contact Desk" },
  { href: "/privacy", label: "Privacy Policy" },
];

const socials = [
  {
    href: "https://www.facebook.com/",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.174 2.097 15.943 2 14.643 2 11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" />
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5M7 8.89H4V20h3zm5.26 0H9.34V20h2.93v-5.57c0-1.48.28-2.92 2.12-2.92 1.82 0 1.84 1.7 1.84 3V20H19v-6.17c0-3.04-.66-5.37-4.2-5.37A3.66 3.66 0 0 0 12.26 10z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8M9.75 15.02V8.98L15.5 12z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#0B1E3D] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <TourVibeLogo variant="onDark" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
            Curated journeys across Bangladesh — from Sajek ridges to Sundarbans
            mangroves — planned with local guides and transparent logistics.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/5 text-slate-100 transition-colors duration-200 hover:border-white/40 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-200 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
            Travel Desk
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              Level 5, Gulshan Avenue, Dhaka 1212
            </li>
            <li>
              <a
                href="tel:+8801711001122"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:underline"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +880 1711-001122
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@tourvibe.com"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:underline"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@tourvibe.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        © 2026 TourVibe. Crafted for thoughtful travel in Bangladesh.
      </div>
    </footer>
  );
}
