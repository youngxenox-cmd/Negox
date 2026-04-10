"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

/** Streak courant depuis le profil */
export function useStreak() {
  const [streak, setStreak] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setStreak(null);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("streak_current")
        .eq("id", user.id)
        .single();
      setStreak(data?.streak_current ?? 0);
      setLoading(false);
    });
  }, []);

  return { streak, loading };
}
