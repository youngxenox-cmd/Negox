import { REX_LOGO } from "@/lib/rex-assets";
import Link from "next/link";

/** Barre du haut — logo Rex + NEGOX (navigation : sidebar) */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-3">
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
            className="rex-asset-img h-8 w-auto -translate-y-1 object-contain object-center"
          />
          <span className="hidden text-xl font-extrabold tracking-tight text-[#E8500A] sm:inline">
            NEGOX
          </span>
        </Link>
      </div>
    </header>
  );
}
