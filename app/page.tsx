import FeaturesList from "@/components/FeaturesList";
import Link from "next/link";

export default async function HomePage() {
  
  return (
    <div className="flex flex-col mb-32">
      <header className="flex flex-col items-center justify-center mt-4">
        <img
          src="/images/Logo-PraiseConnect.png"
          alt="PraiseConnect Logo"
          className="h-10"
        />
        <h1 className="title text-center mt-6">
          Verbinde dich mit Menschen, die{" "}
          <span className="italic font-bold text-primary">deine</span>{" "}
          Interessen teilen!
        </h1>
        <h3 className="text mt-3 text-center text-sm px-4">
          Egal ob Bouldern, Worship-Sessions oder etwas ganz anderes.
          Unkompliziert, direkt, authentisch.
        </h3>
        <Link href="/registrieren" className="btn btn-primary mt-6">
          Jetzt starten!
        </Link>
      </header>
      <section className="flex flex-col mt-12">
        <h2 className="title">
          Features, die dich{" "}
          <span className="italic font-bold text-primary">begeistern</span>{" "}
          werden
        </h2>
        <FeaturesList />
      </section>
      <section className="flex flex-col items-center mt-8">
        <h1 className="title text-center">
          Auf was wartest{" "}
          <span className="italic font-bold text-primary">du</span> noch?
        </h1>
        <Link href="/registrieren" className="btn btn-primary mt-4">
          Finde neue Freunde!
        </Link>
      </section>
    </div>
  );
}
