import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
};

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
}: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn("h-3 w-full overflow-hidden rounded-full bg-navy/10", className)}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-primary to-amber transition-all duration-500",
          barClassName
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
