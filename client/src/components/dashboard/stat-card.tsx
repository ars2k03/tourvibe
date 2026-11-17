import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        {icon ? (
          <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-[#0B1E3D] dark:text-amber-300">
            {icon}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
