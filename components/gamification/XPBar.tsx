import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

type Props = {
  xpTotal: number;
  className?: string;
};

const XP_PER_LEVEL = 500;

/** Barre XP dans le niveau courant */
export function XPBar({ xpTotal, className }: Props) {
  const level = Math.floor(xpTotal / XP_PER_LEVEL) + 1;
  const inLevel = xpTotal % XP_PER_LEVEL;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-1 flex justify-between text-xs font-medium text-navy/70">
        <span>Niveau {level}</span>
        <span>
          {inLevel} / {XP_PER_LEVEL} XP
        </span>
      </div>
      <ProgressBar value={inLevel} max={XP_PER_LEVEL} />
    </div>
  );
}
