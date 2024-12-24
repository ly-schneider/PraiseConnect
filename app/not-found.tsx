"use client"

import { faArrowLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function notFoundPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Seite nicht gefunden | PraiseConnect";
  }, []);

  return (
    <main className="mt-8">
      <section className="max-w-3xl mx-auto mt-14">
        <h1 className="title text-xl text-center">Die Gewünschte Seite konnte leider nicht gefunden werden!</h1>
        <p className="text text-center mt-6">Error 404</p>
        <div className="flex flex-row gap-4 mt-8 justify-center">
          <button onClick={() => router.back()} className="btn btn-attention"><FontAwesomeIcon icon={faArrowLeft} className="me-1.5" />Zurück</button>
          <button onClick={() => window.location.reload()} className="btn btn-primary"><FontAwesomeIcon icon={faRotateRight} className="me-1.5" />Neu laden</button>
        </div>
      </section>
    </main>
  );
}
