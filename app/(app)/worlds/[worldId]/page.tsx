"use client";

import { ScenarioCard } from "@/components/scenario/ScenarioCard";
import { WORLDS, getScenariosForWorld } from "@/data/worlds";
import { useLocalProfile } from "@/hooks/useLocalProfile";
import { isWorldUnlocked } from "@/lib/gamification";
import { getCompletedScenarioIds } from "@/lib/local-progress";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

export default function WorldDetailPage() {
  const params = useParams();
  const worldId = params.worldId as string;
  const { profile, ready } = useLocalProfile();

  const world = WORLDS.find((w) => w.id === worldId);
  const scenarios = getScenariosForWorld(worldId).sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  if (!world) notFound();

  if (!ready || !profile) {
    return <p className="text-center text-sm text-navy/60">Chargement…</p>;
  }

  const completed = getCompletedScenarioIds(profile);
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
