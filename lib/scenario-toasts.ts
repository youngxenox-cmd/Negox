import { LOCAL_BADGE_META } from "@/lib/local-progress";
import { toast } from "sonner";

/** Données renvoyées après un scénario réussi (pour les toasts) */
export type ScenarioCompletionInfo = {
  xpGained: number;
  eurDelta: number;
  leveledUp: boolean;
  previousLevel: number;
  newLevel: number;
  newBadges: string[];
  streakIncreased: boolean;
  streakCurrent: number;
};

/** Affiche les toasts après une partie (XP, niveau, badges, série) */
export function notifyScenarioCompletion(info: ScenarioCompletionInfo): void {
  const parts: string[] = [];
  parts.push(`+${info.xpGained} XP`);
  if (info.eurDelta > 0) {
    parts.push(`+${info.eurDelta.toLocaleString("fr-FR")} € estimés`);
  }
  toast.success("Scénario terminé !", {
    description: parts.join(" · "),
    duration: 3200,
  });

  if (info.leveledUp) {
    toast.success(`Niveau ${info.newLevel} !`, {
      description: `Tu progresses : niveau ${info.previousLevel} → ${info.newLevel}. Continue comme ça.`,
      duration: 5000,
    });
  }

  for (const id of info.newBadges) {
    const meta = LOCAL_BADGE_META[id];
    toast(`Badge débloqué : ${meta?.name ?? id}`, {
      description: meta ? `${meta.emoji} ${meta.name}` : undefined,
      duration: 4500,
    });
  }

  const streakCoveredByBadge = info.newBadges.includes("streak_7");
  if (
    info.streakIncreased &&
    info.streakCurrent >= 2 &&
    !streakCoveredByBadge
  ) {
    toast.info(
      `Série de ${info.streakCurrent} jour${info.streakCurrent > 1 ? "s" : ""} 🔥`,
      {
        description: "Reviens demain pour la prolonger.",
        duration: 3500,
      }
    );
  }
}
