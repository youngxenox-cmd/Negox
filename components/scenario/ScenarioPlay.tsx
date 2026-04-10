"use client";

import { ChoiceButton } from "@/components/scenario/ChoiceButton";
import { ScenarioRexCoach } from "@/components/scenario/ScenarioRexCoach";
import { recordLocalScenarioCompletion } from "@/lib/local-progress";
import type { NegotiationScenario } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  scenario: NegotiationScenario;
};

/** Scénario : coach Rex avec fade out 200ms au clic */
export function ScenarioPlay({ scenario }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coachVisible, setCoachVisible] = useState(true);

  function onChoose(choiceId: string) {
    if (busy) return;
    setBusy(true);
    setCoachVisible(false);
    setError(null);

    window.setTimeout(() => {
      const res = recordLocalScenarioCompletion(scenario.id, choiceId);
      if (!res.ok) {
        setError(res.error);
        setBusy(false);
        setCoachVisible(true);
        return;
      }
      router.push(`/scenario/${scenario.id}/result?c=${choiceId}`);
      router.refresh();
    }, 200);
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

      <ScenarioRexCoach visible={coachVisible} />

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
