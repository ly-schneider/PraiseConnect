"use client";

import { faCircleXmark, faShieldHalved, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { faComments } from "@fortawesome/free-regular-svg-icons";

export default function FeaturesList() {
  return (
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
          Post startet sofort einen privaten Chat – einfach, direkt, persönlich.
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
          Mit den Filterleisten findest du genau die Aktivitäten, die du suchst
          – ob sportlich, kreativ oder entspannt.
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
          Kein Schnickschnack, keine Ablenkung – nur das, was zählt. Diese App
          macht es einfach, sich zu vernetzen und aktiv zu werden.
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
  );
}
