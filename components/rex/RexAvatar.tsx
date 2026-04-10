"use client";

import { cn } from "@/lib/utils";
import type { RexPose } from "@/lib/rex-assets";
import { REX_IMAGE } from "@/lib/rex-assets";

export type { RexPose };

export interface RexAvatarProps {
  pose: RexPose;
  size?: number;
  bounce?: boolean;
  className?: string;
  alt?: string;
}

/** Mascotte Rex — hauteur `size` (px), largeur auto (ratio conservé) */
export function RexAvatar({
  pose,
  size = 80,
  bounce = false,
  className,
  alt = "Rex, ton coach renard",
}: RexAvatarProps) {
  const src = REX_IMAGE[pose];

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 select-none items-end",
        bounce && "rex-bounce",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tailles dynamiques par pose */}
      <img
        src={src}
        alt={alt}
        height={size}
        className="h-auto w-auto max-h-full object-contain object-bottom"
        style={{ height: size, width: "auto" }}
        draggable={false}
      />
    </div>
  );
}
