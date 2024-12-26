import PasswordReset from "@/components/PasswordReset";
import Spinner from "@/components/utils/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Passwort ändern | PraiseConnect",
  };
}

export default function PasswortResetPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Passwort ändern</h1>
      <Suspense fallback={<Spinner className="fill-background h-8 w-8" />}>
        <PasswordReset />
      </Suspense>
    </div>
  );
}
