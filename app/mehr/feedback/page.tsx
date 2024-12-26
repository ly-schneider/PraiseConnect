import BackButton from "@/components/BackButton";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Feedback | PraiseConnect",
  };
}

export default function MehrPage() {
  return (
    <div className="flex flex-col mb-32 mt-2">
      <BackButton />
      <h1 className="title text-4xl mt-4">Feedback</h1>
      <p className="mt-4 text">
        Danke, dass du Feedback geben möchtest! Am besten erreichst du mich
        direkt auf Instagram. Schreib mir einfach eine Nachricht:
      </p>
      <Link href="https://www.instagram.com/ly.schneider/" className="btn btn-attention mt-6">
        Instagram <FontAwesomeIcon icon={faUpRightFromSquare} className="ml-2" />
      </Link>
    </div>
  );
}
