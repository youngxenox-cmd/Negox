import { ScenarioPlay } from "@/components/scenario/ScenarioPlay";
import { getScenarioById } from "@/data/scenarios";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default function ScenarioPage({ params }: Props) {
  const scenario = getScenarioById(params.id);
  if (!scenario) notFound();

  return <ScenarioPlay scenario={scenario} />;
}
