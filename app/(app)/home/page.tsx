import { StreakBadge } from "@/components/gamification/StreakBadge";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getNextScenarioId } from "@/lib/gamification";
import { rexHomeMessage } from "@/lib/rex-coach";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("scenario_id")
    .eq("user_id", user.id);

  const completed = new Set(
    (progressRows ?? []).map((r) => r.scenario_id as string)
  );
  const nextId = getNextScenarioId(completed);
  const hour = new Date().getHours();
  const streak = profile?.streak_current ?? 0;
  const rexMsg = rexHomeMessage(streak, hour);

  const eur = profile?.eur_negotiated_total ?? 0;
  const xp = profile?.xp_total ?? 0;
  const level = profile?.level ?? 1;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy">
            Salut{profile?.username ? `, ${profile.username}` : ""} 👋
          </h1>
          <p className="mt-1 text-sm text-navy/65">{rexMsg}</p>
        </div>
        <LevelBadge level={level} />
      </div>

      <StreakBadge streak={streak} />

      <Card>
        <p className="text-xs font-bold uppercase text-navy/50">
          Total négocié (estim.)
        </p>
        <p className="mt-1 text-4xl font-black text-navy">
          {eur.toLocaleString("fr-FR")}{" "}
          <span className="text-2xl text-primary">€</span>
        </p>
        <div className="mt-4">
          <XPBar xpTotal={xp} />
        </div>
      </Card>

      <Link href={nextId ? `/scenario/${nextId}` : "/worlds"}>
        <Button className="w-full min-h-[56px] text-lg">
          {nextId ? "Jouer maintenant" : "Explorer les mondes"}
        </Button>
      </Link>
    </div>
  );
}
