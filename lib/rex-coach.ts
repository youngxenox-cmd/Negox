/** Messages Rex personnalisés (heure / streak) pour le dashboard */

export function rexHomeMessage(streak: number, hour: number): string {
  if (streak >= 7) {
    return "Ta série est en feu — garde ce rythme, chaque scénario affine ton instinct.";
  }
  if (hour < 12) {
    return "Bonjour ! Un court scénario ce matin, c’est le meilleur réveil pour ton portefeuille.";
  }
  if (hour < 18) {
    return "L’après-midi est parfait pour enchaîner un monde : un pas de plus vers le niveau suivant.";
  }
  return "Le soir, on réfléchit mieux aux mots : idéal pour un scénario un peu plus corsé.";
}
