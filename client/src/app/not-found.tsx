import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-slate-600 dark:text-slate-400">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
        This trail does not exist
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        The page you requested is off the map. Return home or explore active tours.
      </p>
      <Link
        href="/tours"
        className="mt-6 rounded-lg bg-[#0B1E3D] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#152E59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] focus-visible:ring-offset-2 dark:focus-visible:ring-amber-400"
      >
        Explore tours
      </Link>
    </div>
  );
}
