import { MobileNav } from "@/components/layout/MobileNav";
import { Sidebar } from "@/components/layout/Sidebar";

/** Layout applicatif : sidebar desktop + nav mobile */
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-57px)] max-w-6xl">
      <Sidebar />
      <main className="flex-1 px-4 pb-24 pt-6 md:pb-8">{children}</main>
      <MobileNav />
    </div>
  );
}
