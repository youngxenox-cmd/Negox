"use client";

import { ChoiceButton } from "@/components/scenario/ChoiceButton";
import { RexMessage } from "@/components/rex/RexMessage";
import { Card } from "@/components/ui/Card";
import { useState } from "react";

/** Démo statique sur la landing (sans auth) */
export function DemoScenario() {
  const [picked, setPicked] = useState<string | null>(null);
  const feedback =
    picked === "b"
      ? "Parfait : tu retournes la question avant de chiffrer. C’est souvent là que se gagne la marge."
      : picked
        ? "Essaie une autre option — en vrai scénario, Rex détaille l’impact en euros."
        : "Choisis une réponse pour voir le style du jeu (sans compte).";

  return (
    <Card className="max-w-xl">
      <p className="text-xs font-bold uppercase text-primary">Démo</p>
      <h3 className="mt-1 text-lg font-bold text-navy">
        Négocier son salaire à l&apos;embauche
      </h3>
      <p className="mt-2 text-sm text-navy/75">
        La DRH te demande tes prétentions. Que réponds-tu ?
      </p>
      <div className="mt-4 grid gap-2">
        <ChoiceButton
          onClick={() => setPicked("a")}
          selected={picked === "a"}
        >
          « Je vise 42 000 €. »
        </ChoiceButton>
        <ChoiceButton
          onClick={() => setPicked("b")}
          selected={picked === "b"}
        >
          « Quelle fourchette pour ce poste ? »
        </ChoiceButton>
        <ChoiceButton
          onClick={() => setPicked("c")}
          selected={picked === "c"}
        >
          « Je suis flexible. »
        </ChoiceButton>
      </div>
      <div className="mt-4">
        <RexMessage>{feedback}</RexMessage>
      </div>
    </Card>
  );
}
