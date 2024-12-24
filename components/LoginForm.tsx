"use client";

import Link from "next/link";
import { useState } from "react";
import { saveSession } from "@/lib/Session";
import { useRouter, useSearchParams } from "next/navigation";
import BackendUrl from "./utils/BackendUrl";
import Spinner from "./utils/Spinner";

interface LoginFormErrors {
  email: string;
  password: string;
  submit: string;
}

const initialErrors: LoginFormErrors = {
  email: "",
  password: "",
  submit: "",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
    submit: "",
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrors(initialErrors);

    const errors = { ...initialErrors };

    if (!email) {
      errors.email = "Bitte gib deine E-Mail Adresse ein.";
    }

    if (!password) {
      errors.password = "Bitte gib dein Passwort ein.";
    }

    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof LoginFormErrors]) {
        setLoading(false);
        setErrors(errors);
        return;
      }
    });

    try {
      const body = {
        email,
        password,
      };

      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const token = res.headers.get("accesstoken")?.split(" ")[1];

      await saveSession(token as string);

      const data = await res.json();

      console.log(data);

      if (data.success) {
        setLoading(false);

        if (searchParams.get("redirect")) {
          router.push(searchParams.get("redirect") as string);
          return;
        }

        router.push("/entdecken");
      } else {
        throw new Error(data.type);
      }
    } catch (error) {
      setLoading(false);

      if (error.message === "wrong-credentials") {
        setErrors({
          ...errors,
          submit: "Die E-Mail Adresse oder das Passwort ist falsch.",
        });
        return;
      }

      setErrors({
        ...errors,
        submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      });
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
      <form onSubmit={handleLogin}>
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
          <div className="flex flex-col gap-2">
            <Link
              href="/passwort-vergessen"
              className="text text-primary underline"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>
        <button className="btn btn-attention w-full mt-4" type="submit">
          <Spinner className={"fill-background transition-default " + (loading ? "mr-3" : "hidden")} />
          Login
        </button>
        <p className="text mt-4">
          Noch kein Account?{" "}
          <Link href="/registrieren" className="text-primary underline">
            Jetzt registrieren
          </Link>
        </p>
      </form>
    </div>
  );
}
