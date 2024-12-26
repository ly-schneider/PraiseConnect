import ForgotPassword from "@/components/ForgotPassword";
import Spinner from "@/components/utils/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Passwort vergessen | PraiseConnect",
  };
}

export default function PasswortVergessenPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Passwort vergessen</h1>
      <Suspense fallback={<Spinner className="fill-background h-8 w-8" />}>
        <ForgotPassword />
      </Suspense>
    </div>
  );
}
