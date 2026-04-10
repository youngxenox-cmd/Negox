import { cn } from "@/lib/utils";

type Props = {
  level: number;
  className?: string;
};

export function LevelBadge({ level, className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-primary text-lg font-black text-white shadow-md",
        className
      )}
    >
      {level}
    </div>
  );
}
