"use client";

import { StreakBadge } from "@/components/gamification/StreakBadge";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLocalProfile } from "@/hooks/useLocalProfile";
import { getNextScenarioId } from "@/lib/gamification";
import { getCompletedScenarioIds } from "@/lib/local-progress";
import { rexHomeMessage } from "@/lib/rex-coach";
import Link from "next/link";

export default function HomePage() {
  const { profile, ready } = useLocalProfile();

  if (!ready || !profile) {
    return (
      <p className="text-center text-sm text-navy/60">Chargement…</p>
    );
  }

  const completed = getCompletedScenarioIds(profile);
  const nextId = getNextScenarioId(completed);
  const hour = new Date().getHours();
  const streak = profile.streak_current;
  const rexMsg = rexHomeMessage(streak, hour);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy">
            Salut{profile.username ? `, ${profile.username}` : ""} 👋
          </h1>
          <p className="mt-1 text-sm text-navy/65">{rexMsg}</p>
        </div>
        <LevelBadge level={profile.level} />
      </div>

      <StreakBadge streak={streak} />

      <Card>
        <p className="text-xs font-bold uppercase text-navy/50">
          Total négocié (estim.)
        </p>
        <p className="mt-1 text-4xl font-black text-navy">
          {profile.eur_negotiated_total.toLocaleString("fr-FR")}{" "}
          <span className="text-2xl text-primary">€</span>
        </p>
        <div className="mt-4">
          <XPBar xpTotal={profile.xp_total} />
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
