"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLoggedOut() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 z-50 w-full flex flex-col justify-center items-center bg-background py-4 pt-2">
      <div className="max-w-md w-full">
        <div className="text bg-transparent rounded-full border-2 border-text mx-6">
          <div className="flex justify-between items-center w-full">
            <Link
              href="/"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Home
            </Link>
            <Link
              href="/registrieren"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/registrieren") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Registrieren
            </Link>
            <Link
              href="/login"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/login") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
