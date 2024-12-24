"use client";

import { cn } from "@/lib/utils";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <button className={cn("btn btn-attention w-10 h-10 p-0", className)} onClick={() => router.back()}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}