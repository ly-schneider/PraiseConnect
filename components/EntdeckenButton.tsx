"use client";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function EntdeckenButton() {
  
  return (
    <Link href="/posts/erstellen" className="btn btn-attention py-2 px-5">
      <FontAwesomeIcon icon={faPlus} className="me-2 fill-background" />
      Erstellen
    </Link>
  );
}
