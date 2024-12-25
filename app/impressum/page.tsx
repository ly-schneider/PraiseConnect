import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Impressum | PraiseConnect",
  };
}

export default function ImpressumPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Impressum</h1>
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-2">
          <h3 className="title">Verantwortlich für diese Website</h3>
          <p className="text">
            <Link href="https://leys.ch" className="text-primary underline">
              Leys Services
            </Link>
            <br />
            Levyn Schneider
            <br />
            Neumattstrasse 26
            <br />
            3127 Mühlethurnen
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="title">Kontakt</h3>
          <Link
            href="mailto:kontakt@praiseconnect.ch"
            className="text text-primary underline"
          >
            kontakt@praiseconnect.ch
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="title">Disclaimer</h3>
          <div className="flex flex-col gap-2">
            <h4 className="title text-xl">
              Haftungsausschluss für nutzergenerierte Inhalte
            </h4>
            <p className="text">
              Die Inhalte auf dieser Plattform, insbesondere nutzergenerierte
              Beiträge, werden von den jeweiligen Nutzern erstellt.
              PraiseConnect übernimmt keine Gewähr für die Richtigkeit,
              Vollständigkeit, Verlässlichkeit oder Aktualität dieser Inhalte.
              Als Plattformbetreiber ist PraiseConnect nicht verpflichtet, diese
              Inhalte zu überwachen oder auf mögliche Rechtsverletzungen zu
              prüfen.
            </p>
            <p className="text">
              Für Schäden oder Ansprüche, die sich aus der Nutzung von
              nutzergenerierten Inhalten ergeben, übernehmen wir keine Haftung,
              es sei denn, sie beruhen auf Vorsatz oder grober Fahrlässigkeit
              von PraiseConnect.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="title text-xl">Links zu externen Websites</h4>
            <p className="text">
              Diese Plattform kann Links zu externen Websites enthalten.
              PraiseConnect hat keinen Einfluss auf deren Inhalte und übernimmt
              keine Verantwortung für diese. Sollten Sie rechtswidrige Inhalte
              auf verlinkten Seiten feststellen, bitten wir um einen
              entsprechenden Hinweis, damit wir die Links überprüfen und
              gegebenenfalls entfernen können.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="title text-xl">Schutzrechte</h4>
            <p className="text">
              Alle Rechte an den Inhalten der Plattform bleiben vorbehalten. Die
              Inhalte dürfen ohne vorherige schriftliche Zustimmung von
              PraiseConnect weder ganz noch teilweise für kommerzielle Zwecke
              vervielfältigt, verbreitet, verändert oder Dritten zugänglich
              gemacht werden.
            </p>
          </div>
          <p className="text">
            Mit der Nutzung dieser Plattform akzeptieren Sie diese Bedingungen.
          </p>
        </div>
      </div>
    </div>
  );
}
