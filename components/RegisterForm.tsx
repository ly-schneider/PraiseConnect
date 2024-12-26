"use client";

import Link from "next/link";
import { useState } from "react";
import { saveSession } from "@/lib/Session";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Spinner from "./utils/Spinner";
import { AccountDTO } from "@/model/Account";
import { JWTPayload } from "jose";

interface RegigsterFormErrors {
  email: string;
  password: string;
  name: string;
  birthdate: string;
  terms: string;
  submit: string;
}

const initialErrors: RegigsterFormErrors = {
  email: "",
  password: "",
  name: "",
  birthdate: "",
  terms: "",
  submit: "",
};

export default function RegisterForm({
  account,
  session,
}: {
  account: AccountDTO | null;
  session: { accessToken: string; user: JWTPayload } | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState(account !== null ? account.email : "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(account !== null ? account.name : "");
  const [birthdate, setBirthdate] = useState(
    account?.birthdate
      ? new Date(account.birthdate).toISOString().split("T")[0]
      : "2000-01-01"
  );
  const [terms, setTerms] = useState<CheckedState>(account !== null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegigsterFormErrors>({
    email: "",
    password: "",
    name: "",
    birthdate: "",
    terms: "",
    submit: "",
  });

  async function handleRegistration(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrors(initialErrors);

    const errors = { ...initialErrors };

    if (!email) {
      errors.email = "Bitte gib deine E-Mail Adresse ein.";
    }

    if (account !== null && !password) {
      errors.password = "Bitte gib dein Passwort ein.";
    }

    if (!name) {
      errors.name = "Bitte gib deinen Namen ein.";
    }

    if (!birthdate) {
      errors.birthdate = "Bitte gib dein Geburtsdatum ein.";
    }

    if (account !== null && !terms) {
      errors.terms =
        "Bitte akzeptiere die Nutzungsbedingungen und Datenschutzrichtlinien.";
    }

    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof RegigsterFormErrors]) {
        setLoading(false);
        setErrors(errors);
        return;
      }
    });

    try {
      let body: AccountDTO;

      if (account === null) {
        body = {
          email,
          password,
          name,
          birthdate: new Date(birthdate),
          terms,
        };
      } else {
        body = {
          email,
          name,
          birthdate: new Date(birthdate),
        };
      }

      if (account !== null && account.email !== email && session) {
        const emailCheckRes = await fetch(
          `/api/accounts/email?email=${email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const emailCheckData = await emailCheckRes.json();

        if (!emailCheckData.success) {
          setErrors({ ...errors, email: "Diese E-Mail Adresse wird bereits verwendet." });
          setLoading(false);
          return;
        }
      }

      const url =
        account === null ? "/api/accounts" : `/api/accounts/id/${account._id}`;
      const method = account === null ? "POST" : "PUT";

      let headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (account !== null && session) {
        headers = {
          ...headers,
          Authorization: `Bearer ${session.accessToken}`,
        };
      }

      const res = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error();
      }

      if (account === null || account.email !== email) {
        const token = res.headers.get("accesstoken")?.split(" ")[1];
        await saveSession(token as string);
      }

      const data = await res.json();

      if (data.success) {
        setLoading(false);

        if (searchParams.get("redirect")) {
          router.push(searchParams.get("redirect") as string);
          return;
        }

        if (account === null) {
          router.push("/posts");
        } else {
          router.refresh();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(
        `Error ${account === null ? "creating" : "updating"} account:`,
        error
      );
      setErrors({
        ...errors,
        submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      });
      setLoading(false);
      return;
    }
  }

  return (
    <div className="mt-6">
      {errors.submit && (
        <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleRegistration}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text">
              E-Mail Adresse:
            </label>
            <input
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
          {account === null && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text">
                Passwort
              </label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Gib dein Passwort ein"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text text-error">{errors.password}</span>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Max"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span className="text text-error">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birthdate" className="text">
              Geburtsdatum:
            </label>
            <input
              type="date"
              id="birthdate"
              className="input"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            {errors.birthdate && (
              <span className="text text-error">{errors.birthdate}</span>
            )}
          </div>
          {account === null && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Checkbox
                  id="terms"
                  checked={terms}
                  onCheckedChange={setTerms}
                />
                <label htmlFor="terms" className="text text-sm cursor-pointer">
                  Ich akzeptiere die{" "}
                  <Link
                    href={"/nutzungsbedingungen"}
                    className="underline text-primary"
                    target="_blank"
                  >
                    Nutzungsbedingungen
                  </Link>{" "}
                  und{" "}
                  <Link
                    href={"/datenschutzrichtlinien"}
                    className="underline text-primary"
                    target="_blank"
                  >
                    Datenschutzrichtlinien
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <span className="ms-0.5 text-sm text text-error">
                  {errors.terms}
                </span>
              )}
            </div>
          )}
        </div>
        <button className="btn btn-attention w-full mt-4" type="submit">
          <Spinner
            className={
              "fill-background transition-default " +
              (loading ? "mr-3" : "hidden")
            }
          />
          {account === null ? "Registrieren" : "Speichern"}
        </button>
        {account === null && (
          <p className="text mt-4">
            Bereits einen Account?{" "}
            <Link href="/login" className="text-primary underline">
              Jetzt einloggen
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
