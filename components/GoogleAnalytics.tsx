"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleAnalytics() {
  const gaId = "G-Q0QVVLNFE8";
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setShowCookieConsent(true);
    }
  }, []);

  function handleClick() {
    setShowCookieConsent(false);
    localStorage.setItem("cookieConsent", "true");
  }

  return (
    <>
      <div
        className={`fixed bottom-[7rem] z-50 w-full flex flex-col justify-center items-center ${
          showCookieConsent ? "block" : "hidden"
        }`}
      >
        <div className="max-w-md mx-6 text bg-background rounded-[20px] p-4 border-2 border-text">
          <p className="text text-sm mb-1">
            Durch die Nutzung dieser Website erklärst du sich automatisch mit
            der Verwendung von Cookies und unseren Datenschutzrichtlinien
            einverstanden.
          </p>
          <Link
            href="/datenschutz"
            className="text text-sm text-primary underline"
          >
            Mehr erfahren
          </Link>
          <div className="text-end mt-3 w-full flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              className="btn btn-primary text-sm order-1 sm:order-2"
              onClick={handleClick}
            >
              Schliessen
            </button>
          </div>
        </div>
      </div>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-${gaId}`}
      ></Script>
      <Script id="gtag-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-${gaId}');
        `}
      </Script>
    </>
  );
}
