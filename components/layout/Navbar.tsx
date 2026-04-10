import Link from "next/link";

/** Barre du haut — accès direct à l’app (sans auth) */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/home" className="flex items-center gap-2">
          <span className="text-2xl">🦊</span>
          <span className="text-xl font-black tracking-tight text-navy">
            NEGOX
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/home" className="text-navy/80 hover:text-primary">
            Accueil
          </Link>
          <Link href="/worlds" className="text-navy/80 hover:text-primary">
            Mondes
          </Link>
          <Link href="/profile" className="text-navy/80 hover:text-primary">
            Profil
          </Link>
        </nav>
      </div>
    </header>
  );
}
