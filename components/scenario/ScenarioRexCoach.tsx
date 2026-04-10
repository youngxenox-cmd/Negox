"use client";

import { RexAvatar } from "@/components/rex/RexAvatar";

type Props = {
  visible: boolean;
};

/** Rex « thinking » + bulle ; fade 200ms via classe parent */
export function ScenarioRexCoach({ visible }: Props) {
  return (
    <div
      className={`flex items-end gap-2 transition-opacity duration-200 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <RexAvatar pose="thinking" size={60} />
      <div className="scenario-rex-bubble relative rounded-2xl border-2 border-primary bg-white px-3 py-2 text-xs font-medium text-navy shadow-sm">
        Réfléchis bien avant de répondre...
      </div>
    </div>
  );
}
