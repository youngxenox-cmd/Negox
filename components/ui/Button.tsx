import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90 shadow-md active:scale-[0.98]",
  secondary:
    "bg-navy text-white hover:bg-navy/90 active:scale-[0.98]",
  ghost:
    "bg-white/80 text-navy border border-navy/10 hover:bg-white",
  danger: "bg-error text-white hover:bg-error/90",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-base font-semibold transition-all disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
