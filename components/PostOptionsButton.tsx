"use client";

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JWTPayload } from "jose";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { PostDTO } from "@/model/Post";

export default function PostOptionsButton({
  post,
  session,
}: {
  post: PostDTO;
  session: { accessToken: string; user: JWTPayload } | null;
}) {
  const router = useRouter();

  async function handlePostDelete() {
    const res = await fetch(`/api/posts/id/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    if (res.ok) {
      router.push("/posts");
    } else {
      console.error("Fehler beim Löschen des Posts");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn btn-primary w-10 h-10 p-2">
        <FontAwesomeIcon icon={faEllipsisH} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-error cursor-pointer" onClick={handlePostDelete}>
          <FontAwesomeIcon icon={faTrashCan} />
          Löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
