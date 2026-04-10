import { Card } from "@/components/ui/Card";
import { SCENARIO_BY_ID } from "@/data/scenarios";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: userBadges } = await supabase
    .from("user_badges")
    .select("badge_id, earned_at")
    .eq("user_id", user.id);

  const badgeIds = (userBadges ?? []).map((u) => u.badge_id);
  const { data: badgeRows } =
    badgeIds.length > 0
      ? await supabase.from("badges").select("*").in("id", badgeIds)
      : { data: [] as { id: string; name: string; description: string | null; emoji: string | null }[] };

  const badgeMap = new Map((badgeRows ?? []).map((b) => [b.id, b]));

  const { data: history } = await supabase
    .from("user_progress")
    .select("scenario_id, best_score, eur_earned, completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(8);

  const initials =
    (profile?.username?.slice(0, 2) ?? user.email?.slice(0, 2) ?? "??").toUpperCase();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-black text-white">
          {initials}
        </div>
        <div>
          <h1 className="text-xl font-black text-navy">
            {profile?.username ?? "Négociateur"}
          </h1>
          <p className="text-sm text-navy/60">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs font-bold uppercase text-navy/50">Série</p>
          <p className="mt-1 text-2xl font-black text-primary">
            {profile?.streak_current ?? 0}{" "}
            <span className="text-sm font-semibold text-navy/50">jours</span>
          </p>
          <p className="text-xs text-navy/45">
            Record : {profile?.streak_max ?? 0}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-bold uppercase text-navy/50">Niveau</p>
          <p className="mt-1 text-2xl font-black text-navy">
            {profile?.level ?? 1}
          </p>
        </Card>
      </div>

      <Card>
        <p className="text-xs font-bold uppercase text-navy/50">
          Total EUR négociés (estim.)
        </p>
        <p className="mt-2 text-4xl font-black text-navy">
          {(profile?.eur_negotiated_total ?? 0).toLocaleString("fr-FR")}{" "}
          <span className="text-2xl text-primary">€</span>
        </p>
      </Card>

      <div>
        <h2 className="text-sm font-bold uppercase text-navy/50">Badges</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {(userBadges ?? []).length === 0 ? (
            <p className="col-span-3 text-sm text-navy/55">
              Aucun badge pour l’instant — complète des scénarios !
            </p>
          ) : (
            userBadges?.map((ub) => {
              const badge = badgeMap.get(ub.badge_id);
              return (
                <div
                  key={ub.badge_id}
                  className="flex flex-col items-center rounded-card border border-navy/10 bg-white p-3 text-center shadow-card"
                >
                  <span className="text-2xl">{badge?.emoji ?? "🏅"}</span>
                  <p className="mt-1 text-xs font-bold text-navy">
                    {badge?.name ?? ub.badge_id}
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
          {(history ?? []).map((h) => (
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
                  {h.completed_at
                    ? new Date(h.completed_at).toLocaleDateString("fr-FR")
                    : ""}
                </p>
              </Card>
            </li>
          ))}
        </ul>
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
