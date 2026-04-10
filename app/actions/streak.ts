"use server";

import { createClient } from "@/lib/supabase/server";
import { toDateOnly, addDays } from "@/lib/gamification";

/** Remet la série à 0 si la dernière activité n’est ni aujourd’hui ni hier */
export async function normalizeStreakOnSession(): Promise<{ ok: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false };

  const { data: profile } = await supabase
    .from("profiles")
    .select("streak_last_activity")
    .eq("id", user.id)
    .single();

  if (!profile) return { ok: false };

  const todayStr = toDateOnly(new Date());
  const yesterdayStr = toDateOnly(addDays(new Date(), -1));
  const last = profile.streak_last_activity as string | null;

  if (!last) return { ok: true };

  if (last === todayStr || last === yesterdayStr) {
    return { ok: true };
  }

  await supabase
    .from("profiles")
    .update({ streak_current: 0 })
    .eq("id", user.id);

  return { ok: true };
}
