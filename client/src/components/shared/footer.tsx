import Link from "next/link";
import { Compass, Mail, MapPin, Phone } from "lucide-react";

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
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Compass className="h-5 w-5" />
            TourVibe
          </div>
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
                className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-white/15 px-2 font-mono text-xs uppercase tracking-wide text-slate-200 hover:bg-white/10 hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Travel Desk
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              Level 5, Gulshan Avenue, Dhaka 1212
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              +880 1711-001122
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              hello@tourvibe.com
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
