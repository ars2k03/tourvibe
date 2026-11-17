import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-sm text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
        This trail does not exist
      </h1>
      <p className="mt-3 text-slate-500">
        The page you requested is off the map. Return home or explore active tours.
      </p>
      <Link
        href="/tours"
        className="mt-6 rounded-lg bg-[#0B1E3D] px-5 py-2.5 text-sm font-semibold text-white"
      >
        Explore tours
      </Link>
    </div>
  );
}
