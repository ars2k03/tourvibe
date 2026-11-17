import { cn } from "@/lib/utils";

export function TourVibeLogo({
  className,
  markClassName,
  showWordmark = true,
  variant = "default",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  variant?: "default" | "onDark";
}) {
  const onDark = variant === "onDark";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 36 36"
        className={cn("h-8 w-8 shrink-0", markClassName)}
        aria-hidden="true"
      >
        {onDark ? (
          <>
            <rect width="36" height="36" rx="10" fill="#FFFFFF" />
            <circle
              cx="18"
              cy="18"
              r="11"
              fill="none"
              stroke="#0B1E3D"
              strokeWidth="1.75"
            />
            <path
              d="M18 9.5 L20.8 16.2 L28 18 L20.8 19.8 L18 26.5 L15.2 19.8 L8 18 L15.2 16.2 Z"
              fill="#F59E0B"
            />
            <circle cx="18" cy="18" r="2.2" fill="#FFFFFF" />
          </>
        ) : (
          <>
            <rect
              width="36"
              height="36"
              rx="10"
              className="fill-[#0B1E3D] dark:fill-white"
            />
            <circle
              cx="18"
              cy="18"
              r="11"
              fill="none"
              strokeWidth="1.75"
              className="stroke-white dark:stroke-[#0B1E3D]"
            />
            <path
              d="M18 9.5 L20.8 16.2 L28 18 L20.8 19.8 L18 26.5 L15.2 19.8 L8 18 L15.2 16.2 Z"
              fill="#F59E0B"
            />
            <circle
              cx="18"
              cy="18"
              r="2.2"
              className="fill-[#0B1E3D] dark:fill-white"
            />
          </>
        )}
      </svg>
      {showWordmark ? (
        <span
          className={cn(
            "text-lg font-semibold tracking-tight",
            onDark ? "text-white" : "text-[#0B1E3D] dark:text-white",
          )}
        >
          TourVibe
        </span>
      ) : null}
      <span className="sr-only">TourVibe</span>
    </span>
  );
}
