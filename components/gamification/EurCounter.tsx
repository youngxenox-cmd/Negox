"use client";

import { cn } from "@/lib/utils";
import { animate } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  className?: string;
};

/** Compteur EUR animé (résultat de négociation) */
export function EurCounter({ value, className }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <span>{display.toLocaleString("fr-FR")}</span>
      <span className="text-2xl font-bold text-primary">€</span>
    </span>
  );
}
