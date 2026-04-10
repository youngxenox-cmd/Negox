import { ScenarioCard } from "@/components/scenario/ScenarioCard";
import { WORLDS, getScenariosForWorld } from "@/data/worlds";
import { isWorldUnlocked } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { worldId: string } };

export default async function WorldDetailPage({ params }: Props) {
  const { worldId } = params;
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) notFound();

  const scenarios = getScenariosForWorld(worldId).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: progressRows } = await supabase
    .from("user_progress")
    .select("scenario_id")
    .eq("user_id", user.id);

  const completed = new Set(
    (progressRows ?? []).map((r) => r.scenario_id as string)
  );

  const unlocked = isWorldUnlocked(worldId, completed);

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/worlds"
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Mondes
      </Link>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-3xl">{world.emoji}</span>
        <h1 className="text-2xl font-black text-navy">{world.name}</h1>
      </div>
      <p className="mt-1 text-sm text-navy/65">{world.description}</p>
      <p className="mt-2 text-sm text-navy/65">
        {unlocked
          ? "Choisis un scénario pour t’entraîner."
          : "Complète au moins 50 % du monde précédent pour débloquer."}
      </p>
      {scenarios.length === 0 ? (
        <p className="mt-8 rounded-card border border-dashed border-navy/20 bg-white p-6 text-center text-navy/60">
          Nouveaux scénarios bientôt disponibles dans ce monde.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {scenarios.map((s) => (
            <ScenarioCard
              key={s.id}
              scenario={s}
              done={completed.has(s.id)}
              locked={!unlocked}
            />
          ))}
        </div>
      )}
    </div>
  );
}
