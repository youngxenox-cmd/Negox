import { Navbar } from "@/components/layout/Navbar";
import { AppToaster } from "@/components/providers/AppToaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEGOX — Apprends à négocier en jouant",
  description:
    "Scénarios réalistes, feedback chiffré en euros et coach Rex pour progresser comme sur Duolingo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Navbar />
        <AppToaster />
        {children}
      </body>
    </html>
  );
}
