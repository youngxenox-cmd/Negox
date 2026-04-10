"use client";

import { HomeRexBar } from "@/components/rex/HomeRexBar";
import { OnboardingWelcome } from "@/components/rex/OnboardingWelcome";
import { StreakBadge } from "@/components/gamification/StreakBadge";
import { XPBar } from "@/components/gamification/XPBar";
import { LevelBadge } from "@/components/gamification/LevelBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLocalProfile } from "@/hooks/useLocalProfile";
import { getNextScenarioId } from "@/lib/gamification";
import { getCompletedScenarioIds } from "@/lib/local-progress";
import Link from "next/link";
import { useEffect, useState } from "react";

const LS_ONBOARDING = "negox_onboarding_done";

export default function HomePage() {
  const { profile, ready } = useLocalProfile();
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);

  useEffect(() => {
    setOnboardingDone(localStorage.getItem(LS_ONBOARDING) === "1");
  }, []);

  if (!ready || !profile || onboardingDone === null) {
    return (
      <p className="text-center text-sm text-navy/60">Chargement…</p>
    );
  }

  const completed = getCompletedScenarioIds(profile);
  const nextId = getNextScenarioId(completed);
  const streak = profile.streak_current;

  const firstHref = nextId ? `/scenario/${nextId}` : "/worlds";

  function completeOnboarding() {
    localStorage.setItem(LS_ONBOARDING, "1");
    setOnboardingDone(true);
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      {!onboardingDone ? (
        <OnboardingWelcome
          onDismiss={completeOnboarding}
          firstScenarioHref={firstHref}
        />
      ) : (
        <HomeRexBar streak={streak} />
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-navy">
            Salut{profile.username ? `, ${profile.username}` : ""} 👋
          </h1>
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

      <Link href={firstHref}>
        <Button className="w-full min-h-[56px] text-lg">
          {nextId ? "Jouer maintenant" : "Explorer les mondes"}
        </Button>
      </Link>
    </div>
  );
}
