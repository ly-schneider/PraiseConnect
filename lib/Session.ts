"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import Now from "@/components/utils/TimeNow";
import { PayloadDTO } from "@/model/PayloadDTO";
import { JWTPayload } from "jose";

export async function decrypt(
  bearerToken: string | null
): Promise<JWTPayload | null> {
  if (!bearerToken) return null;
  const token = bearerToken.split(" ")[1];

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jose.jwtVerify(token, secret);

    if (payload.exp === undefined) return null;

    const time = Now().getTime() / 1000;
    if (payload.exp < time) {
      await logout();
      return null;
    }

    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function encrypt(payload: PayloadDTO): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .setIssuer("praiseconnect.ch")
    .setAudience("praiseconnect.ch")
    .sign(secret);

  return token;
}

export async function saveSession(token: string): Promise<void> {
  const expires = new Date(new Date().setDate(new Date().getDate() + 7));
  const cookieStore = await cookies();

  cookieStore.set("session", token, { expires, httpOnly: true });
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<{
  accessToken: string;
  user: JWTPayload;
} | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  if (!token) return null;

  const user = await decrypt("Bearer " + token);
  if (!user) return null;

  return {
    accessToken: token,
    user,
  };
}
