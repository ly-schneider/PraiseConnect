"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "../Footer";
import { JWTPayload } from "jose";

export default function NavigationLoggedIn({
  session,
}: {
  session: {
    accessToken: string;
    user: JWTPayload;
  };
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _session = session;
  
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  // TODO: Implement unread chat messages badge

  return (
    <div className="fixed bottom-0 z-50 w-full flex flex-col justify-center items-center bg-background py-4 pt-2">
      <div className="max-w-md w-full">
        <div className="text bg-transparent rounded-full border-2 border-text mx-6">
          <div className="flex justify-between items-center w-full">
            <Link
              href="/posts"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/posts") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Entdecken
            </Link>
            <Link
              href="/chats"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/chats") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Chats
            </Link>
            <Link
              href="/mehr"
              className={`text w-full text-center py-3 px-7 ${
                isActive("/mehr") ? "bg-text text-background" : ""
              } rounded-full transition-default hover:bg-text hover:text-background cursor-pointer`}
            >
              Mehr
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
