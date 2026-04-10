import { SCENARIOS } from "@/data/scenarios";
import type { NegotiationScenario, WorldMeta } from "@/types";

/** Métadonnées des 6 mondes (alignées sur la seed SQL) */
export const WORLDS: WorldMeta[] = [
  {
    id: "bureau",
    name: "Bureau",
    description: "Entretiens, salaire, management",
    emoji: "💼",
    orderIndex: 1,
    isPremium: false,
    color: "#E8500A",
  },
  {
    id: "immo",
    name: "Immobilier",
    description: "Loyer, achat, colocation",
    emoji: "🏠",
    orderIndex: 2,
    isPremium: false,
    color: "#3498DB",
  },
  {
    id: "freelance",
    name: "Freelance",
    description: "TJM, contrats, clients",
    emoji: "💻",
    orderIndex: 3,
    isPremium: false,
    color: "#9B59B6",
  },
  {
    id: "quotidien",
    name: "Quotidien",
    description: "Artisans, achats du quotidien",
    emoji: "🛒",
    orderIndex: 4,
    isPremium: false,
    color: "#27AE60",
  },
  {
    id: "perso",
    name: "Perso",
    description: "Relations et limites personnelles",
    emoji: "🤝",
    orderIndex: 5,
    isPremium: true,
    color: "#E91E63",
  },
  {
    id: "avance",
    name: "Avancé",
    description: "Négociations complexes",
    emoji: "🎯",
    orderIndex: 6,
    isPremium: true,
    color: "#F5A623",
  },
];

export function getWorldsOrdered(): WorldMeta[] {
  return [...WORLDS].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getScenariosForWorld(worldId: string): NegotiationScenario[] {
  return SCENARIOS.filter((s) => s.worldId === worldId);
}
