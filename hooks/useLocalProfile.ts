"use client";

import { loadProfile, type LocalProfile } from "@/lib/local-progress";
import { useCallback, useEffect, useState } from "react";

/** Profil local (localStorage), prêt après le premier effet client */
export function useLocalProfile() {
  const [profile, setProfile] = useState<LocalProfile | undefined>(undefined);

  const refresh = useCallback(() => {
    setProfile(loadProfile());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { profile, ready: profile !== undefined, refresh };
}
