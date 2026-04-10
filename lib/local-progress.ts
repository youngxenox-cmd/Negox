import { getScenarioById } from "@/data/scenarios";
import {
  addDays,
  computeStreakUpdate,
  computeXpGained,
  eurForProfileTotal,
  levelFromXp,
  toDateOnly,
} from "@/lib/gamification";

const STORAGE_KEY = "negox_local_profile_v1";

/** Une entrée de progression pour un scénario */
export type LocalProgressEntry = {
  scenario_id: string;
  best_score: number;
  choice_made: string;
  eur_earned: number;
  attempts: number;
  completed_at: string;
};

/** Profil + progression stockés en local (pas d’auth) */
export type LocalProfile = {
  username: string;
  xp_total: number;
  eur_negotiated_total: number;
  level: number;
  streak_current: number;
  streak_max: number;
  streak_last_activity: string | null;
  progress: Record<string, LocalProgressEntry>;
  badges: string[];
};

export const LOCAL_BADGE_META: Record<
  string,
  { name: string; emoji: string }
> = {
  first_scenario: { name: "Premier pas", emoji: "🌱" },
  eur_1000: { name: "Mille euros", emoji: "💶" },
  streak_7: { name: "Semaine de feu", emoji: "🔥" },
};

function defaultProfile(): LocalProfile {
  return {
    username: "Joueur",
    xp_total: 0,
    eur_negotiated_total: 0,
    level: 1,
    streak_current: 0,
    streak_max: 0,
    streak_last_activity: null,
    progress: {},
    badges: [],
  };
}

/** Remet la série à 0 si la dernière activité n’est ni aujourd’hui ni hier */
function normalizeStreakIfStale(p: LocalProfile): LocalProfile {
  const todayStr = toDateOnly(new Date());
  const yesterdayStr = toDateOnly(addDays(new Date(), -1));
  const last = p.streak_last_activity;
  if (!last) return p;
  if (last === todayStr || last === yesterdayStr) return p;
  return { ...p, streak_current: 0 };
}

export function loadProfile(): LocalProfile {
  if (typeof window === "undefined") return defaultProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile();
    const parsed = JSON.parse(raw) as LocalProfile;
    const merged = { ...defaultProfile(), ...parsed };
    const normalized = normalizeStreakIfStale(merged);
    if (
      normalized.streak_current !== merged.streak_current ||
      normalized.streak_last_activity !== merged.streak_last_activity
    ) {
      saveProfile(normalized);
    }
    return normalized;
  } catch {
    return defaultProfile();
  }
}

export function saveProfile(p: LocalProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function getCompletedScenarioIds(p: LocalProfile): Set<string> {
  return new Set(Object.keys(p.progress));
}

function addBadgeIfNew(p: LocalProfile, id: string): LocalProfile {
  if (p.badges.includes(id)) return p;
  return { ...p, badges: [...p.badges, id] };
}

/** Enregistre la fin d’un scénario (local uniquement) */
export function recordLocalScenarioCompletion(
  scenarioId: string,
  choiceId: string
): { ok: true } | { ok: false; error: string } {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return { ok: false, error: "Scénario inconnu" };
  const choice = scenario.choices.find((c) => c.id === choiceId);
  if (!choice) return { ok: false, error: "Choix invalide" };

  let p = loadProfile();
  p = normalizeStreakIfStale(p);

  const score = choice.score;
  const eurEarned = choice.eur_result;
  const xpGain = computeXpGained(score, scenario.difficulty);
  const eurDelta = eurForProfileTotal(eurEarned);

  const streakUp = computeStreakUpdate(
    p.streak_current,
    p.streak_max,
    p.streak_last_activity
  );

  const newXp = p.xp_total + xpGain;
  const newLevel = levelFromXp(newXp);
  const newEurTotal = p.eur_negotiated_total + eurDelta;

  const existing = p.progress[scenarioId];
  const attempts = (existing?.attempts ?? 0) + 1;
  const bestScore = Math.max(existing?.best_score ?? 0, score);

  const entry: LocalProgressEntry = {
    scenario_id: scenarioId,
    best_score: bestScore,
    choice_made: choiceId,
    eur_earned: eurEarned,
    attempts,
    completed_at: new Date().toISOString(),
  };

  p = {
    ...p,
    xp_total: newXp,
    level: newLevel,
    eur_negotiated_total: newEurTotal,
    streak_current: streakUp.streak_current,
    streak_max: streakUp.streak_max,
    streak_last_activity: streakUp.streak_last_activity,
    progress: { ...p.progress, [scenarioId]: entry },
  };

  const doneCount = Object.keys(p.progress).length;
  if (doneCount >= 1) p = addBadgeIfNew(p, "first_scenario");
  if (newEurTotal >= 1000) p = addBadgeIfNew(p, "eur_1000");
  if (streakUp.streak_current >= 7) p = addBadgeIfNew(p, "streak_7");

  saveProfile(p);
  return { ok: true };
}
