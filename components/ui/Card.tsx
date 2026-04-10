import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "rounded-card border border-navy/5 bg-white p-5 shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
