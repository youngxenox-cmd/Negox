"use client";

import { recordScenarioCompletion } from "@/app/actions/scenario";
import { ChoiceButton } from "@/components/scenario/ChoiceButton";
import { RexMessage } from "@/components/rex/RexMessage";
import type { NegotiationScenario } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  scenario: NegotiationScenario;
};

/** Scénario interactif : enregistre la complétion puis affiche le résultat */
export function ScenarioPlay({ scenario }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChoose(choiceId: string) {
    setBusy(true);
    setError(null);
    const res = await recordScenarioCompletion(scenario.id, choiceId);
    if (!res.ok) {
      setError(res.error);
      setBusy(false);
      return;
    }
    router.push(`/scenario/${scenario.id}/result?c=${choiceId}`);
    router.refresh();
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <div>
        <p className="text-xs font-bold uppercase text-primary">
          {scenario.characterName} · {scenario.characterRole}
        </p>
        <h1 className="mt-1 text-2xl font-black text-navy">{scenario.title}</h1>
        <p className="mt-3 text-navy/80">{scenario.context}</p>
      </div>

      <RexMessage>{scenario.rexIntro}</RexMessage>

      <div className="grid gap-3">
        {scenario.choices.map((ch) => (
          <ChoiceButton
            key={ch.id}
            disabled={busy}
            onClick={() => onChoose(ch.id)}
          >
            {ch.text}
          </ChoiceButton>
        ))}
      </div>

      {error ? (
        <p className="text-center text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
