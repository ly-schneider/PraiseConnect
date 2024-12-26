"use client";

import { Separator } from "@/components/ui/separator";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import {
  faGavel,
  faRightFromBracket,
  faSection,
  faShieldHalved,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { logout } from "@/lib/Session";
import { useRouter } from "next/navigation";

export default function MoreList() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 mt-8">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/mehr/account">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faSliders}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Account</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </Link>
        </li>
        <li>
          <button
            className="w-full"
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Logout</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </button>
        </li>
        <li>
          <Link href="/mehr/feedback">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faLightbulb}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Feedback</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </Link>
        </li>
      </ul>
      <Separator />
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/impressum">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faSection}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Impressum</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/datenschutzrichtlinien">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Datenschutz</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/nutzungsbedingungen">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faGavel}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Nutzungsbedingungen</p>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 -rotate-90" />
            </div>
          </Link>
        </li>
      </ul>
      <Separator />
      <ul className="flex flex-row gap-4 justify-evenly">
        <li>
          <Link
            target="_blank"
            href="https://github.com/ly-schneider/PraiseConnect"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">GitHub</p>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link target="_blank" href="https://www.instagram.com/ly.schneider/">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primarySlanted w-10 h-10 rounded-full flex items-center justify-center text-text">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-text z-10 text-base"
                  />
                </div>
                <p className="text text-base">Instagram</p>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <p className="text text-center">
        Betrieben durch{" "}
        <Link
          target="_blank"
          href="https://leys.ch"
          className="text-primary underline"
        >
          Leys Services
        </Link>
      </p>
    </div>
  );
}
