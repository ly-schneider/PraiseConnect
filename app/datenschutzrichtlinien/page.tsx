import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Datenschutzrichtlinien | PraiseConnect",
  };
}

export default function DatenschutzrichtlinienPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-[1.875rem]">Datenschutzrichtlinien</h1>
      <div className="flex flex-col gap-4 mt-6">
        <div>
          <h2 className="title text-2xl">1. Einleitung</h2>
          <p className="text mt-4">
            PraiseConnect (nachfolgend &quot;wir&quot; oder &quot;uns&quot;)
            nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
            Ihre personenbezogenen Daten vertraulich und entsprechend den
            gesetzlichen Datenschutzvorschriften der Schweiz sowie dieser
            Datenschutzrichtlinien.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">2. Verantwortliche Stelle</h2>
          <p className="text mt-4">
            Verantwortliche Stelle für die Datenverarbeitung im Zusammenhang mit
            der Nutzung der Webapplikation &quot;PraiseConnect&quot; ist:
          </p>
          <p className="text mt-4">
            <Link
              href="https://leys.ch"
              target="_blank"
              className="underline text-primary"
            >
              Leys Services
            </Link>
            <br />
            <Link
              href="mailto:kontakt@praiseconnect.ch"
              className="underline text-primary"
            >
              kontakt@praiseconnect.ch
            </Link>
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">
            3. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <ul className="mt-4 gap-4 flex flex-col">
            <li>
              <h3 className="title text-lg">3.1 Nutzerdaten</h3>
              <p className="text">
                Bei der Registrierung und Nutzung der Webapplikation
                &quot;PraiseConnect&quot; erheben wir die von Ihnen angegebenen
                personenbezogenen Daten, wie Name, Alter und optionale
                Kontaktinformationen. Diese Daten werden zur Bereitstellung
                unserer Dienste verwendet.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">3.2 Chat-Daten</h3>
              <p className="text">
                Bitte beachten Sie, dass Nachrichten und Inhalte, die über
                unsere Chat-Funktion ausgetauscht werden, nicht Ende-zu-Ende
                verschlüsselt sind. Wir empfehlen daher, keine sensiblen
                persönlichen Informationen über den Chat auszutauschen.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">3.3 Analysedaten</h3>
              <p className="text">
                Zur Verbesserung unserer Dienste analysieren wir anonymisierte
                Nutzungsdaten. Es werden keine Tools von Drittanbietern wie
                Google Analytics verwendet.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="title text-2xl">4. Datensicherheit</h2>
          <p className="text mt-4">
            Wir ergreifen angemessene technische und organisatorische
            Massnahmen, um Ihre Daten vor unberechtigtem Zugriff, Verlust,
            Missbrauch oder Zerstörung zu schützen. Bitte beachten Sie jedoch,
            dass die Chat-Funktion nicht Ende-zu-Ende verschlüsselt ist, wodurch
            ein gewisses Restrisiko bei der Übertragung von Informationen
            besteht.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">5. Weitergabe von Daten</h2>
          <p className="text mt-4">
            Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur,
            wenn dies zur Erfüllung unseres Dienstes notwendig ist, wir
            gesetzlich dazu verpflichtet sind oder Sie ausdrücklich eingewilligt
            haben.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">
            6. Aufbewahrung und Löschung von Daten
          </h2>
          <p className="text mt-4">
            Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für
            die Erfüllung der in diesen Datenschutzrichtlinien genannten Zwecke
            erforderlich ist. Nach Wegfall des jeweiligen Zweckes werden die
            Daten gelöscht oder anonymisiert.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">7. Ihre Rechte</h2>
          <ul className="mt-4 gap-4 flex flex-col">
            <li>
              <h3 className="title text-lg">7.1 Auskunftsrecht</h3>
              <p className="text">
                Sie haben das Recht, Auskunft über die von uns verarbeiteten
                personenbezogenen Daten zu erhalten.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">7.2 Berichtigungsrecht</h3>
              <p className="text">
                Sie haben das Recht, die Berichtigung unrichtiger oder die
                Vervollständigung Ihrer bei uns gespeicherten personenbezogenen
                Daten zu verlangen.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">7.3 Löschungsrecht</h3>
              <p className="text">
                Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten
                personenbezogenen Daten zu verlangen, sofern keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="title text-2xl">
            8. Änderungen dieser Datenschutzrichtlinien
          </h2>
          <p className="text mt-4">
            Wir behalten uns vor, diese Datenschutzrichtlinien jederzeit zu
            ändern. Änderungen werden auf unserer Website veröffentlicht. Es
            gilt die jeweils aktuelle Fassung.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">9. Kontakt</h2>
          <p className="text mt-4">
            Bei Fragen oder Anliegen zu diesen Datenschutzrichtlinien oder zur
            Verarbeitung Ihrer personenbezogenen Daten können Sie sich jederzeit
            an uns wenden:
          </p>
          <p className="text mt-4">
            <Link
              href="https://leys.ch"
              target="_blank"
              className="underline text-primary"
            >
              Leys Services
            </Link>
            <br />
            <Link
              href="mailto:kontakt@praiseconnect.ch"
              className="underline text-primary"
            >
              kontakt@praiseconnect.ch
            </Link>
          </p>
          <p className="text mt-4">Datum der letzten Änderung: 23.12.2024</p>
        </div>
      </div>
    </div>
  );
}
