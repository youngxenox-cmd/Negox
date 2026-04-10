import { REX_LOGO } from "@/lib/rex-assets";
import Link from "next/link";

/** Barre du haut — logo tête de Rex + NEGOX (texte masqué sur mobile) */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/home"
          className="flex items-center gap-2"
          aria-label="NEGOX — Accueil"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={REX_LOGO}
            alt=""
            width={120}
            height={32}
            className="rex-asset-img h-8 w-auto object-contain object-bottom"
          />
          <span className="hidden text-xl font-extrabold tracking-tight text-[#E8500A] sm:inline">
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
