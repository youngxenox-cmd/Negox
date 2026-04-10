import { DemoScenario } from "@/components/landing/DemoScenario";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

/** Page marketing optionnelle (l’entrée par défaut est /home) */
export default function LandingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <section className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            NEGOX
          </p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-navy md:text-5xl">
            Apprends à négocier en jouant
          </h1>
          <p className="mt-4 text-lg text-navy/75">
            Des scénarios réels (salaire, loyer, freelance…), un impact estimé
            en euros et Rex, ton coach renard, à chaque étape.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/home">
              <Button className="min-h-[52px] min-w-[200px]">
                Commencer
              </Button>
            </Link>
          </div>
        </div>
        <DemoScenario />
      </section>

      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-3xl font-black text-primary">+12 k€</p>
          <p className="mt-2 font-semibold text-navy">en moyenne</p>
          <p className="text-sm text-navy/65">
            Objectif pédagogique : visualiser le levier de bons réflexes.
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-black text-amber">6 mondes</p>
          <p className="mt-2 font-semibold text-navy">de situations</p>
          <p className="text-sm text-navy/65">
            Bureau, immo, freelance, quotidien… progressif comme un parcours.
          </p>
        </Card>
        <Card>
          <p className="text-3xl font-black text-success">24/7</p>
          <p className="mt-2 font-semibold text-navy">entraînement</p>
          <p className="text-sm text-navy/65">
            Court, ciblé, mobile-first : idéal entre deux réunions.
          </p>
        </Card>
      </section>
    </div>
  );
}
