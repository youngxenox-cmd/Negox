import type { NegotiationScenario } from "@/types";

/** Scénarios MVP (données en dur — sync possible plus tard avec Supabase) */
export const SCENARIOS: NegotiationScenario[] = [
  {
    id: "bureau_sal_001",
    worldId: "bureau",
    title: "Négocier son salaire à l'embauche",
    context:
      "Tu es en fin d'entretien pour un poste de chef de projet. La DRH te demande tes prétentions salariales.",
    characterName: "Marie",
    characterRole: "DRH, ton directe",
    difficulty: 2,
    eurStake: 4200,
    rexIntro:
      "Avant de chiffrer, Rex te conseille : mieux vaut explorer la fourchette interne que de donner le premier ton chiffre.",
    choices: [
      {
        id: "a",
        text: "Je cherche autour de 42 000 euros.",
        score: 40,
        eur_result: 0,
        feedback:
          "Tu as ancré trop tôt. La marge de l’employeur reste invisible.",
      },
      {
        id: "b",
        text: "Quelle est la fourchette prévue pour ce poste ?",
        score: 100,
        eur_result: 4200,
        feedback:
          "Parfait. Tu retournes la question. Marie annonce 40-46k. Tu viens de te donner 6 000€ de marge de négociation.",
      },
      {
        id: "c",
        text: "J'étais à 38k donc je vise 42k.",
        score: 60,
        eur_result: 1800,
        feedback:
          "Tu t’appuies sur le passé, mais tu limites encore ta trajectoire.",
      },
      {
        id: "d",
        text: "Je suis flexible, on verra ensemble.",
        score: 10,
        eur_result: -1200,
        feedback:
          "Trop vague : on risque de te proposer le bas de la grille.",
      },
    ],
    bestChoiceId: "b",
    orderIndex: 1,
  },
  {
    id: "bureau_aug_001",
    worldId: "bureau",
    title: "Demander une augmentation",
    context:
      "Ton manager te convoque pour ton bilan annuel. Tu veux demander une augmentation de 8%. Il te demande comment tu vas.",
    characterName: "Thomas",
    characterRole: "Manager, bienveillant mais économe",
    difficulty: 2,
    eurStake: 3200,
    rexIntro:
      "Commence par le positif et tes résultats : ça cadre la discussion avant le chiffre.",
    choices: [
      {
        id: "a",
        text: "Ça va, merci. Je voulais aborder le sujet de ma rémunération...",
        score: 50,
        eur_result: 800,
        feedback:
          "Correct, mais tu passes un peu vite au sujet sans ancrage factuel.",
      },
      {
        id: "b",
        text: "Très bien ! J'ai d'ailleurs préparé un bilan de mes résultats cette année.",
        score: 100,
        eur_result: 3200,
        feedback:
          "Tu ouvres sur la valeur créée : c’est le bon ordre pour une augmentation.",
      },
      {
        id: "c",
        text: "Honnêtement j'espérais une augmentation depuis un moment.",
        score: 20,
        eur_result: 0,
        feedback:
          "Ton ressenti seul ne suffit pas face à un budget serré.",
      },
      {
        id: "d",
        text: "Je voulais voir si on pouvait revoir mon salaire à la hausse.",
        score: 40,
        eur_result: 600,
        feedback:
          "Formulation un peu directe sans preuves : moins convaincant.",
      },
    ],
    bestChoiceId: "b",
    orderIndex: 2,
  },
  {
    id: "quotidien_artisan_001",
    worldId: "quotidien",
    title: "Négocier avec un artisan",
    context:
      "Un plombier te remet un devis de 1 400€ pour remplacer ta chaudière. Le prix te semble élevé. Il attend ta réponse.",
    characterName: "Marc",
    characterRole: "Plombier, expérimenté",
    difficulty: 1,
    eurStake: 900,
    rexIntro:
      "Un autre devis crédible renforce ta position sans agresser l’interlocuteur.",
    choices: [
      {
        id: "a",
        text: "C'est un peu cher pour moi...",
        score: 30,
        eur_result: 0,
        feedback:
          "Tu exprimes un frein sans levier concret : peu de marge de manœuvre.",
      },
      {
        id: "b",
        text: "Je vais réfléchir et vous rappelle.",
        score: 50,
        eur_result: 200,
        feedback:
          "Pause utile, mais tu ne fais pas bouger le prix tout de suite.",
      },
      {
        id: "c",
        text: "J'ai un autre devis à 1 100€. Vous pouvez vous aligner ?",
        score: 90,
        eur_result: 900,
        feedback:
          "Tu compares au marché : ouverture classique pour négocier.",
      },
      {
        id: "d",
        text: "Je prends. Vous acceptez un paiement en deux fois ?",
        score: 45,
        eur_result: 0,
        feedback:
          "Tu aides le cash-flow, pas le prix : tu laises l’écart sur la table.",
      },
    ],
    bestChoiceId: "c",
    orderIndex: 1,
  },
  {
    id: "immo_loyer_001",
    worldId: "immo",
    title: "Renégocier son loyer",
    context:
      "Ton propriétaire annonce une hausse de loyer de 70€/mois au renouvellement du bail. Tu le rappelles.",
    characterName: "M. Bernard",
    characterRole: "Propriétaire, pragmatique",
    difficulty: 2,
    eurStake: 840,
    rexIntro:
      "Les faits (ancienneté, paiements) et le marché local sont tes deux appuis.",
    choices: [
      {
        id: "a",
        text: "Je comprends mais c'est beaucoup pour moi.",
        score: 20,
        eur_result: 0,
        feedback:
          "Émotion légitime, mais peu d’argument pour faire reculer la hausse.",
      },
      {
        id: "b",
        text: "Je suis locataire depuis 3 ans, toujours à l'heure. Je préférerais maintenir le loyer actuel.",
        score: 70,
        eur_result: 420,
        feedback:
          "Bonne mise en avant de ta fiabilité : compromis partiel crédible.",
      },
      {
        id: "c",
        text: "J'ai comparé avec les annonces du quartier. Les biens équivalents se louent moins cher.",
        score: 100,
        eur_result: 840,
        feedback:
          "Référence marché solide : meilleure chance de limiter ou annuler la hausse.",
      },
      {
        id: "d",
        text: "Dans ce cas je vais chercher autre chose.",
        score: 55,
        eur_result: 840,
        feedback:
          "La menace de départ peut marcher, mais c’est risqué si tu ne l’assumes pas.",
      },
    ],
    bestChoiceId: "c",
    orderIndex: 1,
  },
  {
    id: "freelance_tjm_001",
    worldId: "freelance",
    title: "Défendre son TJM",
    context:
      "Un client potentiel te demande de baisser ton TJM de 400€ à 320€ pour une mission de 3 mois. Il dit que c'est son budget maximum.",
    characterName: "Sophie",
    characterRole: "Directrice projet, négociatrice",
    difficulty: 3,
    eurStake: 6400,
    rexIntro:
      "Le budget est souvent flexible quand on recompose le périmètre ou les livrables.",
    choices: [
      {
        id: "a",
        text: "D'accord, je peux faire un effort pour cette mission.",
        score: 10,
        eur_result: -6400,
        feedback:
          "Tu abandonnes ta valeur sans échange : très coûteux sur la durée.",
      },
      {
        id: "b",
        text: "Mon TJM est basé sur le marché. Je ne peux pas descendre en dessous de 380€.",
        score: 80,
        eur_result: 4800,
        feedback:
          "Ferme sur le prix, mais tu peux encore débloquer avec le scope.",
      },
      {
        id: "c",
        text: "Je comprends votre contrainte. Qu'est-ce qu'on peut ajuster dans le scope pour rester à 400€ ?",
        score: 100,
        eur_result: 6400,
        feedback:
          "Tu relies budget et contenu : meilleure voie pour préserver ton TJM.",
      },
      {
        id: "d",
        text: "Je vais réfléchir et vous reviens demain.",
        score: 40,
        eur_result: 0,
        feedback:
          "Pause OK, mais tu ne fais pas avancer la création de valeur ici.",
      },
    ],
    bestChoiceId: "c",
    orderIndex: 1,
  },
];

export const SCENARIO_BY_ID: Record<string, NegotiationScenario> =
  Object.fromEntries(SCENARIOS.map((s) => [s.id, s]));

export function getScenarioById(id: string): NegotiationScenario | undefined {
  return SCENARIO_BY_ID[id];
}
