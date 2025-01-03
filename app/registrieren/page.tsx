import RegisterForm from "@/components/RegisterForm";
import Spinner from "@/components/utils/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Registrieren | PraiseConnect",
  };
}

export default function RegistrierenPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Registrieren</h1>
      <Suspense fallback={<Spinner className="fill-background h-8 w-8" />}>
        <RegisterForm account={null} session={null} />
      </Suspense>
    </div>
  );
}
