import { NextResponse } from "next/server";
import { getSession } from "./lib/Session";

const blacklistPathsUnauthenticatedRegex = /^\/(?!chats|posts|mehr).*$/;
const blacklistPathsAuthenticated: string[] = ["/login", "/registrieren", "/passwort-vergessen", "/passwort-reset"];

export async function middleware(
  request: Request
): Promise<Response | undefined> {
  const { pathname } = new URL(request.url);

  // Regex to skip API routes, static files, and other paths that should always be accessible
  const matchRegex =
    /^\/(?!api|_next|favicon\.ico|fonts|images|impressum|datenschutzrichtlinien|nutzungsbedingungen|passwort-reset).*$/;
  if (!matchRegex.test(pathname)) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (session) {
    if (blacklistPathsAuthenticated.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      !blacklistPathsUnauthenticatedRegex.test(pathname)
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
