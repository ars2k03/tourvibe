"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-slate-500">
          Prefer light or dark surfaces while browsing expeditions.
        </p>
      </div>
      <Card className="p-6">
        <p className="text-sm font-medium">Appearance</p>
        <p className="mt-1 text-sm text-slate-500">
          Current theme: {theme ?? "system"}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setTheme("light")}>
            Light
          </Button>
          <Button variant="secondary" onClick={() => setTheme("dark")}>
            Dark
          </Button>
          <Button variant="secondary" onClick={() => setTheme("system")}>
            System
          </Button>
        </div>
      </Card>
    </div>
  );
}
