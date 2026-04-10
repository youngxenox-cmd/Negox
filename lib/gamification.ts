import type { NegotiationScenario } from "@/types";
import { getScenariosForWorld, getWorldsOrdered } from "@/data/worlds";

/** XP pour un scénario terminé */
export function computeXpGained(score: number, difficulty: number): number {
  return Math.round(score * difficulty * 10);
}

/** Niveau à partir du total XP (palier 500 XP / niveau) */
export function levelFromXp(xpTotal: number): number {
  return Math.floor(xpTotal / 500) + 1;
}

/** EUR ajouté au cumul profil (jamais négatif) */
export function eurForProfileTotal(eurEarned: number): number {
  return Math.max(0, eurEarned);
}

/** Dates en local (sans heure) */
export function toDateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function parseDateOnly(s: string): Date {
  const [y, m, day] = s.split("-").map(Number);
  return new Date(y, m - 1, day);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

/**
 * Met à jour le streak à la complétion d’un scénario.
 * - même jour : inchangé
 * - hier : +1
 * - avant hier ou jamais : repart à 1 (activité du jour)
 */
export function computeStreakUpdate(
  streakCurrent: number,
  streakMax: number,
  streakLastActivity: string | null,
  today: Date = new Date()
): { streak_current: number; streak_max: number; streak_last_activity: string } {
  const todayStr = toDateOnly(today);
  const yesterdayStr = toDateOnly(addDays(today, -1));

  if (streakLastActivity === todayStr) {
    return {
      streak_current: streakCurrent,
      streak_max: Math.max(streakMax, streakCurrent),
      streak_last_activity: todayStr,
    };
  }

  if (streakLastActivity === yesterdayStr) {
    const next = streakCurrent + 1;
    return {
      streak_current: next,
      streak_max: Math.max(streakMax, next),
      streak_last_activity: todayStr,
    };
  }

  // Écart ou première fois : on considère le jour actif comme jour 1
  return {
    streak_current: 1,
    streak_max: Math.max(streakMax, 1, streakCurrent),
    streak_last_activity: todayStr,
  };
}

/** Part du monde : scénarios complétés / total */
export function worldCompletionRatio(
  worldId: string,
  completedScenarioIds: Set<string>
): { completed: number; total: number; ratio: number } {
  const scenarios = getScenariosForWorld(worldId);
  const total = scenarios.length;
  if (total === 0) return { completed: 0, total: 0, ratio: 1 };
  const completed = scenarios.filter((s) =>
    completedScenarioIds.has(s.id)
  ).length;
  return {
    completed,
    total,
    ratio: completed / total,
  };
}

/** Monde considéré comme complété si ≥ 80 % des scénarios sont faits */
export function isWorldCompleted(
  worldId: string,
  completedScenarioIds: Set<string>
): boolean {
  const { total, ratio } = worldCompletionRatio(worldId, completedScenarioIds);
  if (total === 0) return false;
  return ratio >= 0.8;
}

/** Monde précédent dans l’ordre (pour règle de déblocage) */
export function isWorldUnlocked(
  worldId: string,
  completedScenarioIds: Set<string>
): boolean {
  const worlds = getWorldsOrdered();
  const idx = worlds.findIndex((w) => w.id === worldId);
  if (idx <= 0) return true;
  const prev = worlds[idx - 1];
  const { ratio } = worldCompletionRatio(prev.id, completedScenarioIds);
  // Si le monde précédent n’a aucun scénario, on débloque si “complété” logiquement vide
  const prevTotal = getScenariosForWorld(prev.id).length;
  if (prevTotal === 0) return true;
  return ratio >= 0.5;
}

/** Prochain scénario à jouer (ordre global monde puis orderIndex) */
export function getNextScenarioId(
  completedScenarioIds: Set<string>
): string | null {
  const worlds = getWorldsOrdered();
  for (const w of worlds) {
    if (!isWorldUnlocked(w.id, completedScenarioIds)) continue;
    const list = getScenariosForWorld(w.id).sort(
      (a, b) => a.orderIndex - b.orderIndex
    );
    for (const s of list) {
      if (!completedScenarioIds.has(s.id)) return s.id;
    }
  }
  return null;
}

export function getBestChoice(scenario: NegotiationScenario) {
  return scenario.choices.find((c) => c.id === scenario.bestChoiceId);
}
