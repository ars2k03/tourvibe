import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToursExplorer } from "./tours-explorer";

export default function ToursPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10">
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <ToursExplorer />
    </Suspense>
  );
}
