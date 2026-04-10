import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";

/** Layout applicatif : sidebar collée au bord gauche, contenu centré à droite */
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[calc(100vh-57px)] w-full">
      <Sidebar />
      <main className="min-w-0 flex-1 pb-24 pt-6 md:pb-8">
        <div className="mx-auto max-w-6xl px-4">{children}</div>
      </main>
      <MobileNav />
    </div>
  );
}
