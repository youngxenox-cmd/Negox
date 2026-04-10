import { LoginForm } from "@/app/(auth)/login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-black text-navy">Connexion</h1>
        <p className="mt-1 text-sm text-navy/65">
          Retrouve ta série et tes euros négociés.
        </p>
      </div>
      <Suspense fallback={<p className="text-sm text-navy/60">Chargement…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
