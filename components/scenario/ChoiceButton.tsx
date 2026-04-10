"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  selected?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** Grand bouton de choix (mobile-first) */
export function ChoiceButton({
  children,
  selected,
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        "w-full rounded-2xl border-2 px-4 py-4 text-left text-base font-medium transition-all",
        "border-navy/10 bg-white text-navy hover:border-primary/40 hover:bg-cream/80",
        selected && "border-primary bg-cream ring-2 ring-primary/30",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
