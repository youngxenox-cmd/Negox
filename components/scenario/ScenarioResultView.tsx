"use client";

import { ResultRex } from "@/components/scenario/ResultRex";
import { getScenarioById } from "@/data/scenarios";
import { getBestChoice, getNextScenarioId } from "@/lib/gamification";
import { loadProfile } from "@/lib/local-progress";

type Props = {
  scenarioId: string;
  choiceId: string;
};

/** Résultat : progression locale + écran Rex */
export function ScenarioResultView({ scenarioId, choiceId }: Props) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return null;
  const choice = scenario.choices.find((x) => x.id === choiceId);
  if (!choice) return null;

  const profile = loadProfile();
  const completed = new Set(Object.keys(profile.progress));
  const nextId = getNextScenarioId(completed);
  const best = getBestChoice(scenario);

  const nextHref =
    nextId && nextId !== scenario.id ? `/scenario/${nextId}` : "/worlds";
  const nextLabel =
    nextId && nextId !== scenario.id ? "Scénario suivant" : "Voir les mondes";

  return (
    <ResultRex
      score={choice.score}
      eurEarned={choice.eur_result}
      feedback={choice.feedback}
      bestFeedback={best?.feedback}
      scenarioTitle={scenario.title}
      nextHref={nextHref}
      nextLabel={nextLabel}
    />
  );
}
