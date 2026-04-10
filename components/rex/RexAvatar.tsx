"use client";

import { cn } from "@/lib/utils";
import type { RexPose } from "@/lib/rex-assets";
import { REX_IMAGE } from "@/lib/rex-assets";

export type { RexPose };

export interface RexAvatarProps {
  pose: RexPose;
  size?: number;
  /** Micro-animation spécifique à la pose (respiration, tilt, etc.) */
  animate?: boolean;
  /** Mouvement vertical léger supplémentaire (home, onboarding) */
  bounce?: boolean;
  className?: string;
  alt?: string;
}

/** Mascotte Rex — PNG fond transparent, animations discrètes par pose */
export function RexAvatar({
  pose,
  size = 80,
  animate = true,
  bounce = false,
  className,
  alt = "Rex, ton coach renard",
}: RexAvatarProps) {
  const src = REX_IMAGE[pose];

  return (
    <div
      className={cn(
        "inline-flex select-none items-end",
        bounce && "rex-float",
        className
      )}
    >
      <div
        className={cn(
          "rex-pose inline-flex items-end",
          animate && `rex-pose--${pose}`
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- tailles dynamiques */}
        <img
          src={src}
          alt={alt}
          height={size}
          className="rex-asset-img h-auto w-auto max-h-full object-contain object-bottom"
          style={{ height: size, width: "auto" }}
          draggable={false}
        />
      </div>
    </div>
  );
}
