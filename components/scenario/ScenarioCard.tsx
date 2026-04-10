import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { NegotiationScenario } from "@/types";
import { Lock } from "lucide-react";
import Link from "next/link";

type Props = {
  scenario: NegotiationScenario;
  done?: boolean;
  locked?: boolean;
};

export function ScenarioCard({ scenario, done, locked }: Props) {
  const inner = (
    <Card
      className={cn(
        "transition hover:shadow-lg",
        locked && "opacity-60",
        done && "border-success/30 bg-success/5"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-navy">{scenario.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-navy/70">
            {scenario.context}
          </p>
        </div>
        {locked ? (
          <Lock className="h-5 w-5 shrink-0 text-navy/40" />
        ) : (
          <Badge>Diff. {scenario.difficulty}</Badge>
        )}
      </div>
      <p className="mt-3 text-xs text-navy/50">
        Enjeu max. {scenario.eurStake.toLocaleString("fr-FR")} €
      </p>
    </Card>
  );

  if (locked) {
    return <div className="block cursor-not-allowed">{inner}</div>;
  }

  return (
    <Link href={`/scenario/${scenario.id}`} className="block">
      {inner}
    </Link>
  );
}
