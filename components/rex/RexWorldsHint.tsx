"use client";

import { RexAvatar } from "@/components/rex/RexAvatar";

/** Bandeau discret en tête de /worlds */
export function RexWorldsHint() {
  return (
    <div className="mb-6 flex items-center gap-3 opacity-90">
      <RexAvatar pose="point" size={50} />
      <p className="text-sm font-medium text-navy/80">
        Choisis ton terrain d&apos;entraînement 👇
      </p>
    </div>
  );
}
