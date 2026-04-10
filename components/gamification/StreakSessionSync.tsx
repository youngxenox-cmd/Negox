"use client";

import { normalizeStreakOnSession } from "@/app/actions/streak";
import { useEffect } from "react";

/** À l’ouverture de l’app : aligne le streak si l’utilisateur a sauté des jours */
export function StreakSessionSync() {
  useEffect(() => {
    void normalizeStreakOnSession();
  }, []);
  return null;
}
