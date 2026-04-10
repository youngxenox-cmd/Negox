import { ScenarioResultView } from "@/components/scenario/ScenarioResultView";
import { getScenarioById } from "@/data/scenarios";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { c?: string };
};

export default function ScenarioResultPage({ params, searchParams }: Props) {
  const { id } = params;
  const { c } = searchParams;
  if (!c || !getScenarioById(id)) notFound();

  return <ScenarioResultView scenarioId={id} choiceId={c} />;
}
