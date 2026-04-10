import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={user ? "/home" : "/"} className="flex items-center gap-2">
          <span className="text-2xl">🦊</span>
          <span className="text-xl font-black tracking-tight text-navy">
            NEGOX
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold">
          {user ? (
            <>
              <Link href="/worlds" className="text-navy/80 hover:text-primary">
                Mondes
              </Link>
              <Link href="/profile" className="text-navy/80 hover:text-primary">
                Profil
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-navy/80 hover:text-primary">
                Connexion
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                S&apos;inscrire
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
