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
  { href: "https://www.facebook.com/", label: "Fb" },
  { href: "https://www.instagram.com/", label: "Ig" },
  { href: "https://www.linkedin.com/", label: "In" },
  { href: "https://www.youtube.com/", label: "Yt" },
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
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border border-white/15 px-2 font-mono text-xs uppercase tracking-wide text-slate-200 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                {social.label}
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
