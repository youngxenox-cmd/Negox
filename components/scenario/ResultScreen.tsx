"use client";

import { RexAvatar } from "@/components/rex/RexAvatar";
import { RexMessage } from "@/components/rex/RexMessage";
import { Button } from "@/components/ui/Button";
import { EurCounter } from "@/components/gamification/EurCounter";
import type { NegotiationScenario, RexMood } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  scenario: NegotiationScenario;
  eurResult: number;
  feedback: string;
  mood: RexMood;
  bestExplanation?: string;
  nextHref: string;
  nextLabel: string;
};

/** Écran résultat : Rex + montant + suite */
export function ResultScreen({
  scenario,
  eurResult,
  feedback,
  mood,
  bestExplanation,
  nextHref,
  nextLabel,
}: Props) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6 pb-8">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 18 }}
        className="flex flex-col items-center gap-4"
      >
        <RexAvatar mood={mood} size="lg" />
        <p className="text-center text-sm font-semibold text-primary">
          Rex — ton coach
        </p>
      </motion.div>

      <div className="text-center">
        <p className="text-sm text-navy/60">Impact estimé sur cet échange</p>
        <EurCounter value={eurResult} className="justify-center text-4xl font-black text-navy md:text-5xl" />
      </div>

      <RexMessage>{feedback}</RexMessage>

      {bestExplanation ? (
        <div className="rounded-2xl bg-navy/5 px-4 py-3 text-sm text-navy/80">
          <span className="font-semibold text-navy">Meilleur angle : </span>
          {bestExplanation}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={nextHref} className="flex-1">
          <Button className="w-full">{nextLabel}</Button>
        </Link>
        <Link href="/profile" className="flex-1">
          <Button variant="secondary" className="w-full">
            Voir mes stats
          </Button>
        </Link>
      </div>

      <p className="text-center text-xs text-navy/40">
        Scénario : {scenario.title}
      </p>
    </div>
  );
}
