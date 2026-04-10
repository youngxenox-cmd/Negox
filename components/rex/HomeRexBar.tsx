"use client";

import { RexAvatar, type RexPose } from "@/components/rex/RexAvatar";
import { toDateOnly } from "@/lib/gamification";
import { useLayoutEffect, useState } from "react";

const LS_ONBOARDING = "negox_onboarding_done";
const LS_HOME_VISIT = "negox_home_visit_date";

function pointFlagKey(d: string) {
  return `negox_point_${d}`;
}

type Props = {
  streak: number;
};

/** Bandeau Rex + bulle : première ouverture du jour → POINT, sinon messages streak */
export function HomeRexBar({ streak }: Props) {
  const [mode, setMode] = useState<"init" | "point" | "streak">("init");

  useLayoutEffect(() => {
    const today = toDateOnly(new Date());
    const onboardingOk = localStorage.getItem(LS_ONBOARDING) === "1";

    if (onboardingOk && localStorage.getItem(pointFlagKey(today)) !== "1") {
      localStorage.setItem(pointFlagKey(today), "1");
      localStorage.setItem(LS_HOME_VISIT, today);
      setMode("point");
      return;
    }
    setMode("streak");
  }, []);

  if (mode === "init") {
    return (
      <div className="h-[100px] animate-pulse rounded-2xl bg-navy/5" aria-hidden />
    );
  }

  let pose: RexPose;
  let text: string;

  if (mode === "point") {
    pose = "point";
    text = "Prêt pour aujourd'hui ? Un nouveau scénario t'attend.";
  } else if (streak === 0) {
    pose = "sad";
    text =
      "Tu n'as pas joué hier... La négociation ça s'entraîne chaque jour 🦊";
  } else if (streak >= 7) {
    pose = "celebrate";
    text = `${streak} jours de suite ! Tu deviens redoutable en négociation 🔥`;
  } else {
    pose = "neutral";
    text = `Streak de ${streak} jours ! Continue comme ça.`;
  }

  return (
    <div
      key={`${mode}-${text}`}
      className="rex-fade-in flex items-end gap-3 rounded-2xl p-1"
    >
      <RexAvatar pose={pose} size={80} bounce />
      <div className="home-rex-bubble relative flex-1 rounded-[16px] border-2 border-primary bg-white px-4 py-3 text-sm leading-relaxed text-navy shadow-sm">
        <p>{text}</p>
      </div>
    </div>
  );
}
