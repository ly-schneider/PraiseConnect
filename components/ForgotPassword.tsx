"use client";

import { useEffect, useState } from "react";
import Spinner from "./utils/Spinner";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

export default function ForgotPassword() {
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    submit: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.has("email")) {
      setEmail(searchParams.get("email") as string);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrors({ submit: "", email: "" });

    if (email === "") {
      setErrors({ submit: "", email: "E-Mail Adresse ist erforderlich" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/accounts/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok || res.status !== 200) {
        if (data.type === "no-account") {
          setErrors({
            submit: "",
            email: "E-Mail Adresse ist nicht registriert",
          });
        } else {
          setErrors({ submit: "Es ist ein Fehler aufgetreten", email: "" });
        }
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error(error)
      setErrors({ submit: "Es ist ein Fehler aufgetreten", email: "" });
      setLoading(false);
    }
  }

  if (success) {
    return (
      <>
        <div className="flex flex-col w-full mt-8 gap-3">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-success text-4xl mx-auto"
          />
          <p className="text mb-4">
            Wir haben dir eine E-Mail mit einem Link zum zurücksetzen deines
            Passworts gesendet
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full mt-5">
        <p className="text mb-4">
          Bitte gib die E-Mail Adresse von deinem Account an
        </p>
        {errors.submit && (
          <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text">
                E-Mail Adresse:
              </label>
              <input
                autoComplete="email"
                type="email"
                id="email"
                className="input"
                placeholder="max@mustermann.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text text-error">{errors.email}</span>
              )}
            </div>
          </div>
          <button className="btn btn-attention w-full mt-4" type="submit">
            <Spinner
              className={
                "fill-background transition-default " +
                (loading ? "mr-3" : "hidden")
              }
            />
            Weiter
          </button>
        </form>
      </div>
    </>
  );
}
