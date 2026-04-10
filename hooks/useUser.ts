"use client";

import { useLocalProfile } from "@/hooks/useLocalProfile";

/** Remplace l’ancien hook auth : pas de compte, nom affiché = profil local */
export function useUser() {
  const { profile, ready } = useLocalProfile();
  return {
    displayName: profile?.username ?? "Joueur",
    loading: !ready,
  };
}
