"use client";

import { useLocalProfile } from "@/hooks/useLocalProfile";

/** Série (jours) depuis le profil local */
export function useStreak() {
  const { profile, ready } = useLocalProfile();
  return { streak: profile?.streak_current ?? null, loading: !ready };
}
