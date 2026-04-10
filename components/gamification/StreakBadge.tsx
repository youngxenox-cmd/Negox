"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  streak: number;
  className?: string;
};

/** Badge streak avec flamme */
export function StreakBadge({ streak, className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card ring-1 ring-primary/20",
        className
      )}
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-2xl"
        aria-hidden
      >
        🔥
      </motion.span>
      <div>
        <p className="text-xs font-medium text-navy/60">Série</p>
        <p className="text-lg font-bold text-primary">{streak} jours</p>
      </div>
    </div>
  );
}
