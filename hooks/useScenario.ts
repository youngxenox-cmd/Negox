"use client";

import { getScenarioById } from "@/data/scenarios";
import type { NegotiationScenario } from "@/types";
import { useMemo } from "react";

/** Accès typé au scénario courant (données locales MVP) */
export function useScenario(scenarioId: string | undefined) {
  return useMemo(() => {
    if (!scenarioId) return { scenario: undefined as NegotiationScenario | undefined };
    return { scenario: getScenarioById(scenarioId) };
  }, [scenarioId]);
}
