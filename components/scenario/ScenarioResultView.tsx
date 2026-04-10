"use client";

import { ResultScreen } from "@/components/scenario/ResultScreen";
import { getScenarioById } from "@/data/scenarios";
import { getBestChoice, getNextScenarioId } from "@/lib/gamification";
import { loadProfile } from "@/lib/local-progress";
import type { RexMood } from "@/types";

type Props = {
  scenarioId: string;
  choiceId: string;
};

function moodFromScore(score: number): RexMood {
  if (score >= 80) return "excited";
  if (score >= 40) return "happy";
  return "sad";
}

/** Résultat : lit la progression locale pour le bouton « suivant » */
export function ScenarioResultView({ scenarioId, choiceId }: Props) {
  const scenario = getScenarioById(scenarioId);
  if (!scenario) return null;
  const choice = scenario.choices.find((x) => x.id === choiceId);
  if (!choice) return null;

  const profile = loadProfile();
  const completed = new Set(Object.keys(profile.progress));
  const nextId = getNextScenarioId(completed);
  const best = getBestChoice(scenario);
  const mood = moodFromScore(choice.score);

  const nextHref =
    nextId && nextId !== scenario.id ? `/scenario/${nextId}` : "/worlds";
  const nextLabel =
    nextId && nextId !== scenario.id ? "Scénario suivant" : "Voir les mondes";

  return (
    <ResultScreen
      scenario={scenario}
      eurResult={choice.eur_result}
      feedback={choice.feedback}
      mood={mood}
      bestExplanation={best?.feedback}
      nextHref={nextHref}
      nextLabel={nextLabel}
    />
  );
}
