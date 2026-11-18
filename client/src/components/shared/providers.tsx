"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster
          richColors
          position="top-right"
          closeButton
          duration={3200}
          visibleToasts={3}
          toastOptions={{
            classNames: {
              toast: "border border-slate-200 dark:border-slate-700 shadow-sm",
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
