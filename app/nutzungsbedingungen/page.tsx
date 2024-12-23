import Link from "next/link";

export default function NutzungsbedingungenPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-[1.7rem]">Nutzungsbedingungen</h1>
      <div className="flex flex-col gap-4 mt-6">
        <div>
          <h2 className="title text-2xl">1. Einleitung</h2>
          <p className="text mt-4">
            Willkommen bei PraiseConnect! Diese Nutzungsbedingungen regeln die
            Nutzung der Webapplikation PraiseConnect. Durch die Nutzung unserer
            Dienste erklären Sie sich mit diesen Bedingungen einverstanden.
            Bitte lesen Sie sie sorgfältig durch.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">2. Allgemeine Nutzung</h2>
          <p className="text mt-4">
            PraiseConnect bietet eine Plattform, auf der Nutzer Aktivitäten und
            Interessen teilen sowie private Chats mit anderen Nutzern starten
            können. Die Nutzung ist ausschliesslich für private und
            nicht-kommerzielle Zwecke gestattet.
          </p>
          <p className="text mt-4">
            Sie verpflichten sich, die Plattform nur im Einklang mit den
            geltenden Gesetzen und diesen Nutzungsbedingungen zu verwenden.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">3. Registrierung und Konto</h2>
          <ul className="mt-4 gap-4 flex flex-col">
            <li>
              <h3 className="title text-lg">3.1 Registrierung</h3>
              <p className="text">
                Zur Nutzung von PraiseConnect ist eine Registrierung mit Angabe
                eines Namens und Alters erforderlich. Sie verpflichten sich,
                wahrheitsgemässe und vollständige Angaben zu machen.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">3.2 Sicherheit des Kontos</h3>
              <p className="text">
                Sie sind dafür verantwortlich, Ihre Zugangsdaten sicher
                aufzubewahren und nicht an Dritte weiterzugeben. PraiseConnect
                übernimmt keine Haftung für Schäden, die durch die unbefugte
                Nutzung Ihres Kontos entstehen.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">3.3 Beendigung des Kontos</h3>
              <p className="text">
                Sie können Ihr Konto jederzeit löschen. PraiseConnect behält
                sich das Recht vor, Konten zu sperren oder zu löschen, wenn
                gegen diese Nutzungsbedingungen verstossen wird.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="title text-2xl">4. Inhalte und Verantwortung</h2>
          <ul className="mt-4 gap-4 flex flex-col">
            <li>
              <h3 className="title text-lg">4.1 Nutzerinhalte</h3>
              <p className="text">
                Sie sind allein für die Inhalte verantwortlich, die Sie auf
                PraiseConnect veröffentlichen. Dazu gehören Posts, Nachrichten
                und andere Beiträge. Die Inhalte dürfen keine rechtswidrigen,
                diskriminierenden, beleidigenden oder unangemessenen Inhalte
                enthalten.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">4.2 Moderation</h3>
              <p className="text">
                PraiseConnect behält sich das Recht vor, Inhalte zu entfernen
                oder zu ändern, die gegen diese Nutzungsbedingungen verstossen
                oder unangemessen sind.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="title text-2xl">5. Haftung</h2>
          <ul className="mt-4 gap-4 flex flex-col">
            <li>
              <h3 className="title text-lg">5.1 Ausschluss der Haftung</h3>
              <p className="text">
                PraiseConnect übernimmt keine Haftung für Schäden, die durch die
                Nutzung der Plattform entstehen, es sei denn, diese beruhen auf
                vorsätzlichem oder grob fahrlässigem Verhalten seitens
                PraiseConnect.
              </p>
            </li>
            <li>
              <h3 className="title text-lg">5.2 Externe Links</h3>
              <p className="text">
                PraiseConnect kann Links zu externen Websites enthalten. Wir
                übernehmen keine Verantwortung für deren Inhalte oder
                Datenschutzpraktiken.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="title text-2xl">
            6. Änderungen der Nutzungsbedingungen
          </h2>
          <p className="text mt-4">
            PraiseConnect behält sich das Recht vor, diese Nutzungsbedingungen
            jederzeit zu ändern. Änderungen werden auf der Website
            veröffentlicht. Es gilt die jeweils aktuelle Fassung.
          </p>
        </div>
        <div>
          <h2 className="title text-2xl">7. Kontakt</h2>
          <p className="text mt-4">
            Bei Fragen oder Anliegen zu diesen Nutzungsbedingungen können Sie
            uns kontaktieren:
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
