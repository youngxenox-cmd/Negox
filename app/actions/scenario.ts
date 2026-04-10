"use server";

import { getScenarioById } from "@/data/scenarios";
import {
  computeStreakUpdate,
  computeXpGained,
  eurForProfileTotal,
  levelFromXp,
} from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";

export type RecordScenarioResult =
  | { ok: true }
  | { ok: false; error: string };

/** Enregistre la fin d’un scénario : progression, XP, streak, EUR (serveur) */
export async function recordScenarioCompletion(
  scenarioId: string,
  choiceId: string
): Promise<RecordScenarioResult> {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return { ok: false, error: "Scénario inconnu" };

  const choice = scenario.choices.find((c) => c.id === choiceId);
  if (!choice) return { ok: false, error: "Choix invalide" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Non connecté" };

  const score = choice.score;
  const eurEarned = choice.eur_result;
  const xpGain = computeXpGained(score, scenario.difficulty);
  const eurDelta = eurForProfileTotal(eurEarned);

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { ok: false, error: "Profil introuvable" };
  }

  const streakUp = computeStreakUpdate(
    profile.streak_current ?? 0,
    profile.streak_max ?? 0,
    profile.streak_last_activity ?? null
  );

  const newXp = (profile.xp_total ?? 0) + xpGain;
  const newLevel = levelFromXp(newXp);
  const newEurTotal = (profile.eur_negotiated_total ?? 0) + eurDelta;

  const { data: existing } = await supabase
    .from("user_progress")
    .select("id, best_score, attempts")
    .eq("user_id", user.id)
    .eq("scenario_id", scenarioId)
    .maybeSingle();

  const attempts = (existing?.attempts ?? 0) + 1;
  const bestScore = Math.max(existing?.best_score ?? 0, score);

  if (existing) {
    await supabase
      .from("user_progress")
      .update({
        completed_at: new Date().toISOString(),
        best_score: bestScore,
        choice_made: choiceId,
        eur_earned: eurEarned,
        attempts,
      })
      .eq("id", existing.id);
  } else {
    await supabase.from("user_progress").insert({
      user_id: user.id,
      scenario_id: scenarioId,
      best_score: score,
      choice_made: choiceId,
      eur_earned: eurEarned,
      attempts: 1,
    });
  }

  await supabase
    .from("profiles")
    .update({
      xp_total: newXp,
      level: newLevel,
      eur_negotiated_total: newEurTotal,
      streak_current: streakUp.streak_current,
      streak_max: streakUp.streak_max,
      streak_last_activity: streakUp.streak_last_activity,
    })
    .eq("id", user.id);

  // Badges automatiques (MVP)
  const totalScenariosDone = await countCompletedScenarios(supabase, user.id);
  await tryAwardBadge(supabase, user.id, "first_scenario", totalScenariosDone >= 1);
  await tryAwardBadge(supabase, user.id, "eur_1000", newEurTotal >= 1000);
  await tryAwardBadge(
    supabase,
    user.id,
    "streak_7",
    streakUp.streak_current >= 7
  );

  return { ok: true };
}

async function countCompletedScenarios(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
): Promise<number> {
  const { count } = await supabase
    .from("user_progress")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  return count ?? 0;
}

async function tryAwardBadge(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  badgeId: string,
  condition: boolean
) {
  if (!condition) return;
  const { error } = await supabase.from("user_badges").insert({
    user_id: userId,
    badge_id: badgeId,
  });
  // 23505 = doublon — badge déjà obtenu
  if (error && error.code !== "23505") {
    console.error("Badge insert", error);
  }
}
