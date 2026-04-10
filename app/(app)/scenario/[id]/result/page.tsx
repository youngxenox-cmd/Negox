import { ResultScreen } from "@/components/scenario/ResultScreen";
import { getScenarioById } from "@/data/scenarios";
import { getBestChoice } from "@/lib/gamification";
import { getNextScenarioId } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import type { RexMood } from "@/types";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { c?: string };
};

function moodFromScore(score: number): RexMood {
  if (score >= 80) return "excited";
  if (score >= 40) return "happy";
  return "sad";
}

export default async function ScenarioResultPage({ params, searchParams }: Props) {
  const { id } = params;
  const { c } = searchParams;
  const scenario = getScenarioById(id);
  if (!scenario || !c) notFound();

  const choice = scenario.choices.find((x) => x.id === c);
  if (!choice) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("scenario_id")
    .eq("user_id", user.id);

  const completed = new Set(
    (progressRows ?? []).map((r) => r.scenario_id as string)
  );
  const nextId = getNextScenarioId(completed);
  const best = getBestChoice(scenario);
  const mood = moodFromScore(choice.score);

  const nextHref =
    nextId && nextId !== scenario.id
      ? `/scenario/${nextId}`
      : "/worlds";
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
