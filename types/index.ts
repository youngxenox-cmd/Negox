/** Types métier NEGOX (scénarios côté app / MVP) */

export type ScenarioChoice = {
  id: string;
  text: string;
  score: number;
  eur_result: number;
  feedback: string;
};

export type NegotiationScenario = {
  id: string;
  worldId: string;
  title: string;
  context: string;
  characterName: string;
  characterRole: string;
  difficulty: 1 | 2 | 3;
  eurStake: number;
  rexIntro: string;
  choices: ScenarioChoice[];
  bestChoiceId: string;
  orderIndex: number;
};

export type RexMood = "happy" | "sad" | "excited";

export type WorldMeta = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  orderIndex: number;
  isPremium: boolean;
  color: string;
};
