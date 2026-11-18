"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
        Something went off-route
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        An unexpected error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 cursor-pointer rounded-lg bg-[#0B1E3D] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#152E59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1E3D] focus-visible:ring-offset-2 dark:focus-visible:ring-amber-400"
      >
        Try again
      </button>
    </div>
  );
}
