"use client";

import { cn } from "@/lib/utils";
import { Home, Map, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/home", label: "Accueil", icon: Home },
  { href: "/worlds", label: "Mondes", icon: Map },
  { href: "/profile", label: "Profil", icon: User },
];

/** Barre de navigation basse (mobile) */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/10 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-lg justify-around">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-4 py-1 text-xs font-semibold",
                  active ? "text-primary" : "text-navy/50"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
