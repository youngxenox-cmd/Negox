"use client";

import { RexAvatar } from "@/components/rex/RexAvatar";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Props = {
  onDismiss: () => void;
  firstScenarioHref: string;
};

/** Première visite : bienvenue + CTA vers le premier scénario */
export function OnboardingWelcome({ onDismiss, firstScenarioHref }: Props) {
  const router = useRouter();

  return (
    <div className="rex-fade-in flex flex-col items-center gap-5 rounded-card border-2 border-primary/30 bg-white p-6 text-center shadow-card">
      <RexAvatar pose="celebrate" size={100} bounce />
      <div>
        <p className="text-base font-semibold leading-relaxed text-navy">
          Bienvenue ! Je suis Rex, ton coach en négociation. Je serai là à
          chaque étape pour t&apos;aider à négocier malin. Let&apos;s go ! 🦊
        </p>
      </div>
      <Button
        className="w-full max-w-sm"
        onClick={() => {
          onDismiss();
          router.push(firstScenarioHref);
        }}
      >
        Commencer mon premier scénario →
      </Button>
    </div>
  );
}
