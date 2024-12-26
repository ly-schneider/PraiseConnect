"use client";

import { useEffect, useState } from "react";
import Spinner from "./utils/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface ValidToken {
  success: boolean | null;
  message: string;
}

interface PasswordResetErrors {
  submit: string;
  password: string;
  confirmPassword: string;
}

const initialErrors: PasswordResetErrors = {
  submit: "",
  password: "",
  confirmPassword: "",
};

export default function PasswordReset() {
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<PasswordResetErrors>({
    submit: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState<ValidToken>({
    success: null,
    message: "",
  });

  useEffect(() => {
    if (searchParams.has("token")) {
      verifyToken(searchParams.get("token") as string);
    }
  }, []);

  async function verifyToken(token: string) {
    try {
      const res = await fetch(`/api/accounts/password-reset?guid=${token}`, {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok || res.status !== 200) {
        if (data.type === "bad-token") {
          setValidToken({
            success: false,
            message: "Ungültiger Token",
          });
        } else if (data.type === "expired-token") {
          setValidToken({
            success: false,
            message: "Der Token ist abgelaufen",
          });
        } else {
          setValidToken({
            success: false,
            message: "Es gab einen Fehler beim überprüfen",
          });
        }

        return;
      }

      if (data.success) {
        setValidToken({ success: true, message: "" });
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      setValidToken({
        success: false,
        message: "Es gab einen Fehler beim überprüfen",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrors(initialErrors);

    const errors = { ...initialErrors };

    if (password === "") {
      errors.password = "Bitte gib dein neues Passwort ein";
    }

    if (confirmPassword === "") {
      errors.confirmPassword = "Bitte bestätigen dein neues Passwort";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Die Passwörter stimmen nicht überein";
    }

    const hasErrors = Object.keys(errors).some(
      (key) => errors[key as keyof PasswordResetErrors]
    );

    if (hasErrors) {
      setLoading(false);
      setErrors(errors);
      return;
    }

    try {
      const body = {
        password: password,
        guid: searchParams.get("token"),
      };

      const res = await fetch(`/api/accounts/password-reset`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || res.status !== 200) {
        if (data.type === "bad-token") {
          setValidToken({
            success: false,
            message: "Ungültiger Token",
          });
        } else if (data.type === "expired-token") {
          setValidToken({
            success: false,
            message: "Der Token ist abgelaufen",
          });
        } else {
          throw new Error();
        }

        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrors({
        submit: "Es gab einen Fehler beim zurücksetzen deines Passworts",
        password: "",
        confirmPassword: "",
      });
    }
  }

  if (validToken.success === null) {
    return (
      <div className="flex flex-col items-center w-full mt-8">
        <Spinner className="fill-text w-8 h-8" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col w-full mt-5">
        <p className="text mb-4">Dein Passwort wurde erfolgreich geändert!</p>
        <Link href="/login" className="btn btn-attention w-full">
          Zurück zum Login
        </Link>
      </div>
    );
  }

  if (validToken.success !== true) {
    return (
      <div className="flex flex-col w-full mt-6">
        <p className="text text-error text-center mb-8">
          <FontAwesomeIcon icon={faXmarkCircle} className="me-1.5" />
          {validToken.message}
        </p>
        <Link href="/passwort-vergessen" className="btn btn-primary w-full">
          <FontAwesomeIcon icon={faArrowLeft} className="me-1.5" />
          Zurück
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col w-full mt-5">
        {errors.submit && (
          <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text">
                Passwort
              </label>
              <input
                autoComplete="new-password"
                type="password"
                id="password"
                className="input"
                placeholder="Gib ein neues Passwort ein"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className="text text-error">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text">
                Passwort bestätigen
              </label>
              <input
                autoComplete="new-password"
                type="password"
                id="confirmPassword"
                className="input"
                placeholder="Bestätige dein neues Passwort"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="text text-error">
                  {errors.confirmPassword}
                </span>
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
            Speichern
          </button>
        </form>
      </div>
    </>
  );
}
