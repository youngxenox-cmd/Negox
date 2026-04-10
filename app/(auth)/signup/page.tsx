"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/home`,
      },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/home");
    router.refresh();
  }

  async function signUpGoogle() {
    setLoading(true);
    const supabase = createClient();
    const origin = window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback?next=/home`,
      },
    });
    setLoading(false);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-black text-navy">Créer un compte</h1>
        <p className="mt-1 text-sm text-navy/65">
          MVP sans friction : email + mot de passe, profil créé automatiquement.
        </p>
      </div>
      <Card>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-navy/70">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy/15 px-3 py-2 text-navy outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-navy/70">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy/15 px-3 py-2 text-navy outline-none focus:border-primary"
            />
          </div>
          {error ? (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Création…" : "S'inscrire"}
          </Button>
        </form>
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-navy/10" />
          <span className="text-xs text-navy/45">ou</span>
          <div className="h-px flex-1 bg-navy/10" />
        </div>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          disabled={loading}
          onClick={signUpGoogle}
        >
          Continuer avec Google
        </Button>
      </Card>
      <p className="text-center text-sm text-navy/65">
        Déjà inscrit ?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Connexion
        </Link>
      </p>
    </div>
  );
}
