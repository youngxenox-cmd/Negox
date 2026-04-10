"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

/** IDs des scénarios complétés par l’utilisateur */
export function useProgress() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        setCompletedIds([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("user_progress")
        .select("scenario_id")
        .eq("user_id", user.id);
      setCompletedIds(data?.map((r) => r.scenario_id) ?? []);
      setLoading(false);
    });
  }, []);

  return { completedIds, loading };
}
