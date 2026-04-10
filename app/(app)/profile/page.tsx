"use client";

import { Card } from "@/components/ui/Card";
import { SCENARIO_BY_ID } from "@/data/scenarios";
import { useLocalProfile } from "@/hooks/useLocalProfile";
import { LOCAL_BADGE_META } from "@/lib/local-progress";
import Link from "next/link";
import { useMemo } from "react";

export default function ProfilePage() {
  const { profile, ready } = useLocalProfile();

  const history = useMemo(() => {
    if (!profile) return [];
    return Object.values(profile.progress)
      .sort(
        (a, b) =>
          new Date(b.completed_at).getTime() -
          new Date(a.completed_at).getTime()
      )
      .slice(0, 8);
  }, [profile]);

  if (!ready || !profile) {
    return <p className="text-center text-sm text-navy/60">Chargement…</p>;
  }

  const initials = profile.username.slice(0, 2).toUpperCase() || "JO";

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white">
          {initials}
        </div>
        <div>
          <h1 className="text-xl font-black text-navy">{profile.username}</h1>
          <p className="text-sm text-navy/60">Progression enregistrée sur cet appareil</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs font-bold uppercase text-navy/50">Série</p>
          <p className="mt-1 text-2xl font-black text-primary">
            {profile.streak_current}{" "}
            <span className="text-sm font-semibold text-navy/50">jours</span>
          </p>
          <p className="text-xs text-navy/45">
            Record : {profile.streak_max}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase text-navy/50">Niveau</p>
          <p className="mt-1 text-2xl font-black text-navy">{profile.level}</p>
        </Card>
      </div>

      <Card>
        <p className="text-xs font-bold uppercase text-navy/50">
          Total EUR négociés (estim.)
        </p>
        <p className="mt-2 text-4xl font-black text-navy">
          {profile.eur_negotiated_total.toLocaleString("fr-FR")}{" "}
          <span className="text-2xl text-primary">€</span>
        </p>
      </Card>

      <div>
        <h2 className="text-sm font-bold uppercase text-navy/50">Badges</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {profile.badges.length === 0 ? (
            <p className="col-span-3 text-sm text-navy/55">
              Aucun badge pour l’instant — complète des scénarios !
            </p>
          ) : (
            profile.badges.map((id) => {
              const meta = LOCAL_BADGE_META[id];
              return (
                <div
                  key={id}
                  className="flex flex-col items-center rounded-card border border-navy/10 bg-white p-3 text-center shadow-card"
                >
                  <span className="text-2xl">{meta?.emoji ?? "🏅"}</span>
                  <p className="mt-1 text-xs font-bold text-navy">
                    {meta?.name ?? id}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase text-navy/50">
          Derniers scénarios
        </h2>
        <ul className="mt-2 space-y-2">
          {history.map((h) => (
            <li key={`${h.scenario_id}-${h.completed_at}`}>
              <Card className="py-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-navy">
                    {SCENARIO_BY_ID[h.scenario_id]?.title ?? h.scenario_id}
                  </span>
                  <span className="text-success">
                    {(h.eur_earned ?? 0) >= 0 ? "+" : ""}
                    {h.eur_earned ?? 0} €
                  </span>
                </div>
                <p className="text-xs text-navy/45">
                  Score {h.best_score ?? "—"} ·{" "}
                  {new Date(h.completed_at).toLocaleDateString("fr-FR")}
                </p>
              </Card>
            </li>
          ))}
        </ul>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-navy/55">Aucun scénario terminé.</p>
        ) : null}
        <Link
          href="/worlds"
          className="mt-4 inline-block text-sm font-semibold text-primary"
        >
          Voir tous les mondes →
        </Link>
      </div>
    </div>
  );
}
