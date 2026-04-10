"use client";

import { Toaster } from "sonner";

/** Conteneur global des toasts (position, style aligné NEGOX) */
export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      closeButton
      duration={4000}
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border border-navy/10 bg-white text-navy shadow-lg font-sans",
          title: "font-semibold text-navy",
          description: "text-sm text-navy/70",
          success: "bg-cream !border-success/30",
          error: "!bg-red-50 !border-error/30",
          info: "!bg-white !border-primary/30",
        },
      }}
    />
  );
}
