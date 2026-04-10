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

type Props = {
  className?: string;
};

/** Navigation latérale (desktop) */
export function Sidebar({ className }: Props) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "hidden w-56 shrink-0 flex-col gap-1 border-r border-navy/5 bg-white/80 p-4 md:flex",
        className
      )}
    >
      <p className="mb-2 text-xs font-bold uppercase text-navy/40">Menu</p>
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href || (href !== "/home" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
              active
                ? "bg-primary/10 text-primary"
                : "text-navy/70 hover:bg-cream"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </aside>
  );
}
