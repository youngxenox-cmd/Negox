/** Types alignés sur le schéma Supabase (tables public) */

export type Profile = {
  id: string;
  email: string | null;
  username: string | null;
  profile_type: "salarie" | "freelance" | "all" | string;
  streak_current: number;
  streak_max: number;
  streak_last_activity: string | null;
  xp_total: number;
  eur_negotiated_total: number;
  level: number;
  created_at: string;
};

export type WorldRow = {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  order_index: number | null;
  is_premium: boolean | null;
  color: string | null;
};

export type ScenarioRow = {
  id: string;
  world_id: string;
  title: string;
  context: string;
  character_name: string | null;
  character_role: string | null;
  difficulty: number;
  choices: unknown;
  best_choice_id: string | null;
  rex_intro: string | null;
  eur_stake: number | null;
  is_premium: boolean | null;
  order_index: number | null;
};

export type UserProgressRow = {
  id: string;
  user_id: string;
  scenario_id: string;
  completed_at: string;
  best_score: number | null;
  choice_made: string | null;
  eur_earned: number | null;
  attempts: number | null;
};

export type BadgeRow = {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  condition_type: string | null;
  condition_value: number | null;
};

export type UserBadgeRow = {
  user_id: string;
  badge_id: string;
  earned_at: string;
};
