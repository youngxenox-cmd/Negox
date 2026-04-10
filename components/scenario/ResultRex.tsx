"use client";

import { RexAvatar, type RexPose } from "@/components/rex/RexAvatar";
import { Button } from "@/components/ui/Button";
import { EurCounter } from "@/components/gamification/EurCounter";
import Link from "next/link";

type Props = {
  score: number;
  eurEarned: number;
  feedback: string;
  bestFeedback?: string;
  scenarioTitle: string;
  nextHref: string;
  nextLabel: string;
};

function tierFromScore(score: number): {
  pose: RexPose;
  bg: string;
  intro: string;
  showReplayHint: boolean;
} {
  if (score >= 80) {
    return {
      pose: "celebrate",
      bg: "bg-success/15",
      intro: "",
      showReplayHint: false,
    };
  }
  if (score >= 50) {
    return {
      pose: "neutral",
      bg: "bg-amber/20",
      intro: "Pas mal ! Voici ce que tu aurais pu faire mieux :",
      showReplayHint: false,
    };
  }
  return {
    pose: "sad",
    bg: "bg-error/10",
    intro: "Aïe. Voici ce qui s'est passé :",
    showReplayHint: true,
  };
}

/** Écran résultat : Rex central, badge EUR, bulle, confetti si succès */
export function ResultRex({
  score,
  eurEarned,
  feedback,
  bestFeedback,
  scenarioTitle,
  nextHref,
  nextLabel,
}: Props) {
  const tier = tierFromScore(score);

  return (
    <div className="mx-auto max-w-lg pb-8">
      <div
        className={`result-rex-container relative overflow-hidden rounded-3xl px-4 py-8 ${tier.bg}`}
      >
        {score >= 80 ? <RexConfetti /> : null}

        <div className="rex-slide-up flex flex-col items-center">
          <RexAvatar pose={tier.pose} size={120} />
          <div className="rex-score-badge mt-3 flex items-baseline gap-0.5 rounded-full bg-white/90 px-4 py-1.5 shadow-md">
            {eurEarned >= 0 ? (
              <span className="text-xl font-black text-primary md:text-2xl">
                +
              </span>
            ) : null}
            <EurCounter
              value={eurEarned}
              className="text-xl font-black text-primary md:text-2xl"
            />
          </div>
        </div>

        <div className="rex-speech-bubble mt-6 rounded-[16px] border-2 border-primary/40 bg-white px-4 py-4 shadow-card">
          {tier.intro ? (
            <p className="rex-message mb-2 text-sm font-semibold text-navy">
              {tier.intro}
            </p>
          ) : null}
          <p className="rex-feedback text-sm leading-relaxed text-navy/90">
            {feedback}
          </p>
          {bestFeedback && score >= 50 && score < 80 ? (
            <p className="rex-feedback mt-3 border-t border-navy/10 pt-3 text-sm text-navy/75">
              {bestFeedback}
            </p>
          ) : null}
          {tier.showReplayHint ? (
            <p className="mt-3 text-xs text-navy/55">
              Tu peux rejouer ce scénario !
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={nextHref} className="flex-1">
          <Button className="w-full">{nextLabel}</Button>
        </Link>
        <Link href="/profile" className="flex-1">
          <Button variant="secondary" className="w-full">
            Voir mes stats
          </Button>
        </Link>
      </div>

      <p className="mt-4 text-center text-xs text-navy/40">
        Scénario : {scenarioTitle}
      </p>
    </div>
  );
}

/** Confettis CSS (succès) */
function RexConfetti() {
  const pieces = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {pieces.map((i) => (
        <span
          key={i}
          className="rex-confetti-piece absolute rounded-sm"
          style={{
            left: `${(i * 7) % 100}%`,
            top: "-10%",
            animationDelay: `${i * 0.08}s`,
            backgroundColor: i % 3 === 0 ? "#27AE60" : i % 3 === 1 ? "#F5A623" : "#E8500A",
          }}
        />
      ))}
    </div>
  );
}
