import { redirect } from "next/navigation";

/** Entrée du site : accès direct à l’app (pas de page de connexion) */
export default function RootPage() {
  redirect("/home");
}
