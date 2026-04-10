import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
