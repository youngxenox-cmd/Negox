import { cn } from "@/lib/utils";
import type { RexMood } from "@/types";

type Props = {
  mood: RexMood;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** Mascotte Rex (renard) — états visuels simplifiés */
export function RexAvatar({ mood, size = "md", className }: Props) {
  const sizes = {
    sm: "h-16 w-16 text-3xl",
    md: "h-24 w-24 text-5xl",
    lg: "h-36 w-36 text-7xl",
  };
  const ring =
    mood === "happy"
      ? "ring-success/40"
      : mood === "sad"
        ? "ring-error/40"
        : "ring-amber/50";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber shadow-lg ring-4",
        ring,
        sizes[size],
        className
      )}
      role="img"
      aria-label={`Rex est ${mood === "happy" ? "content" : mood === "sad" ? "déçu" : "enthousiaste"}`}
    >
      <span>🦊</span>
    </div>
  );
}
