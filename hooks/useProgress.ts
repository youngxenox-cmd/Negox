"use client";

import { useLocalProfile } from "@/hooks/useLocalProfile";
import { getCompletedScenarioIds } from "@/lib/local-progress";

/** IDs des scénarios complétés (stockage local) */
export function useProgress() {
  const { profile, ready } = useLocalProfile();
  const completedIds = profile
    ? Array.from(getCompletedScenarioIds(profile))
    : [];
  return { completedIds, loading: !ready };
}
