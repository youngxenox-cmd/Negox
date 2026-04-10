import { Card } from "@/components/ui/Card";
import { getWorldsOrdered } from "@/data/worlds";
import {
  isWorldCompleted,
  isWorldUnlocked,
  worldCompletionRatio,
} from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { Lock } from "lucide-react";
import Link from "next/link";

export default async function WorldsPage() {
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

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-black text-navy">Carte des mondes</h1>
      <p className="mt-1 text-sm text-navy/65">
        Débloque la suite en complétant au moins 50 % du monde précédent.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {getWorldsOrdered().map((w) => {
          const unlocked = isWorldUnlocked(w.id, completed);
          const { completed: done, total } = worldCompletionRatio(
            w.id,
            completed
          );
          const doneWorld = isWorldCompleted(w.id, completed);
          const pct =
            total > 0 ? Math.round((done / total) * 100) : 0;

          const inner = (
            <Card
              className={`h-full transition hover:shadow-lg ${
                !unlocked ? "opacity-60" : ""
              } ${w.isPremium ? "ring-2 ring-amber/40" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-3xl">{w.emoji}</span>
                {!unlocked ? (
                  <Lock className="h-5 w-5 text-navy/40" />
                ) : doneWorld ? (
                  <span className="text-xs font-bold text-success">Complété</span>
                ) : null}
              </div>
              <h2 className="mt-2 text-lg font-bold text-navy">{w.name}</h2>
              <p className="mt-1 text-sm text-navy/70">{w.description}</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-navy/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: w.color ?? "#E8500A",
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-navy/50">
                {unlocked
                  ? total > 0
                    ? `${done}/${total} scénarios`
                    : "Bientôt"
                  : "Monde verrouillé"}
              </p>
              {w.isPremium ? (
                <p className="mt-2 text-xs font-semibold text-amber">
                  Premium (MVP)
                </p>
              ) : null}
            </Card>
          );

          if (!unlocked) {
            return <div key={w.id}>{inner}</div>;
          }

          return (
            <Link key={w.id} href={`/worlds/${w.id}`} className="block">
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
