import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Bulle de dialogue de Rex */
export function RexMessage({ children, className }: Props) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-primary bg-white px-4 py-3 text-navy shadow-card",
        "after:absolute after:-bottom-2 after:left-8 after:h-4 after:w-4 after:rotate-45 after:border-b after:border-r after:border-primary after:bg-white",
        className
      )}
    >
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
