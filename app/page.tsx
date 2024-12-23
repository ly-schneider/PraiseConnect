import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faCircleXmark, faComments } from "@fortawesome/free-regular-svg-icons";
import { faShieldHalved, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col mb-32">
      <header className="flex flex-col items-center justify-center mt-4">
        <img
          src="/images/Logo-PraiseConnect.png"
          alt="PraiseConnect Logo"
          className="h-10"
        />
        <h1 className="title text-center mt-6">
          Verbinde dich mit Menschen, die <span className="italic font-bold text-primary">deine</span>{" "}
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
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-8 h-8 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faComments}
                    className="text-text z-10 text-sm"
                  />
                </div>
                <p className="text">Eine Antwort zum Kontakt</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Ein Klick genügt, um in Kontakt zu treten. Deine Antwort auf einen
              Post startet sofort einen privaten Chat – einfach, direkt,
              persönlich.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-8 h-8 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="text-text z-10 text-sm"
                  />
                </div>
                <p className="text">Nur das, was dich interessiert</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Mit den Filterleisten findest du genau die Aktivitäten, die du
              suchst – ob sportlich, kreativ oder entspannt.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-8 h-8 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-text z-10 text-sm"
                  />
                </div>
                <p className="text">Kein Schnickschnack</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Kein Schnickschnack, keine Ablenkung – nur das, was zählt. Diese
              App macht es einfach, sich zu vernetzen und aktiv zu werden.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-8 h-8 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-text z-10 text-sm"
                  />
                </div>
                <p className="text">Privatsphäre</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Privatsphäre steht bei uns an erster Stelle. Dein Name und Alter
              reichen, um dich zu verbinden – alles Weitere bleibt privat.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="flex flex-col items-center mt-8">
        <h1 className="title text-center">
          Auf was wartest <span className="italic font-bold text-primary">du</span>{" "}noch?
        </h1>
        <Link href="/registrieren" className="btn btn-primary mt-4">
          Finde neue Freunde!
        </Link>
      </section>
    </div>
  );
}
