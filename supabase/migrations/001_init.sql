-- NEGOX — schéma initial Supabase
-- Exécuter dans le SQL Editor Supabase ou via CLI

-- Table profiles (étend auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  username TEXT,
  profile_type TEXT DEFAULT 'all',
  streak_current INTEGER DEFAULT 0,
  streak_max INTEGER DEFAULT 0,
  streak_last_activity DATE,
  xp_total INTEGER DEFAULT 0,
  eur_negotiated_total INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.worlds (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  order_index INTEGER,
  is_premium BOOLEAN DEFAULT false,
  color TEXT
);

CREATE TABLE public.scenarios (
  id TEXT PRIMARY KEY,
  world_id TEXT REFERENCES public.worlds(id),
  title TEXT NOT NULL,
  context TEXT NOT NULL,
  character_name TEXT,
  character_role TEXT,
  difficulty INTEGER DEFAULT 1,
  choices JSONB NOT NULL,
  best_choice_id TEXT,
  rex_intro TEXT,
  eur_stake INTEGER,
  is_premium BOOLEAN DEFAULT false,
  order_index INTEGER
);

CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scenario_id TEXT REFERENCES public.scenarios(id) ON DELETE CASCADE NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  best_score INTEGER,
  choice_made TEXT,
  eur_earned INTEGER,
  attempts INTEGER DEFAULT 1,
  UNIQUE(user_id, scenario_id)
);

CREATE TABLE public.badges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  condition_type TEXT,
  condition_value INTEGER
);

CREATE TABLE public.user_badges (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, badge_id)
);

-- Trigger : création du profil à l'inscription (pas de vérif email MVP)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worlds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Policies profiles : lecture / mise à jour du propre profil (création via trigger)
CREATE POLICY "Users select own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- user_progress
CREATE POLICY "Users select own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Données publiques
CREATE POLICY "Worlds are public"
  ON public.worlds FOR SELECT
  USING (true);

CREATE POLICY "Scenarios are public"
  ON public.scenarios FOR SELECT
  USING (true);

CREATE POLICY "Badges are public"
  ON public.badges FOR SELECT
  USING (true);

-- user_badges
CREATE POLICY "Users select own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Seed mondes (6)
INSERT INTO public.worlds (id, name, description, emoji, order_index, is_premium, color) VALUES
  ('bureau', 'Bureau', 'Entretiens, salaire, management', '💼', 1, false, '#E8500A'),
  ('immo', 'Immobilier', 'Loyer, achat, colocation', '🏠', 2, false, '#3498DB'),
  ('freelance', 'Freelance', 'TJM, contrats, clients', '💻', 3, false, '#9B59B6'),
  ('quotidien', 'Quotidien', 'Artisans, achats du quotidien', '🛒', 4, false, '#27AE60'),
  ('perso', 'Perso', 'Relations et limites personnelles', '🤝', 5, true, '#E91E63'),
  ('avance', 'Avancé', 'Négociations complexes', '🎯', 6, true, '#F5A623')
ON CONFLICT (id) DO NOTHING;

-- Badges démo
INSERT INTO public.badges (id, name, description, emoji, condition_type, condition_value) VALUES
  ('first_scenario', 'Premier pas', 'Compléter un scénario', '🌱', 'scenarios_completed', 1),
  ('eur_1000', 'Mille euros', 'Cumuler 1000 € négociés', '💶', 'eur_total', 1000),
  ('streak_7', 'Semaine de feu', 'Streak de 7 jours', '🔥', 'streak', 7)
ON CONFLICT (id) DO NOTHING;
