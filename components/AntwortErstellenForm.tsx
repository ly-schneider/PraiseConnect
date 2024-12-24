"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./utils/Spinner";
import { JWTPayload } from "jose";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { PostDTO } from "@/model/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface PostErstellenFormErrors {
  submit: string;
  content: string;
}

const initialErrors: PostErstellenFormErrors = {
  submit: "",
  content: "",
};

export default function AntwortErstellenForm({
  session,
  post,
}: {
  session: { accessToken: string; user: JWTPayload } | null;
  post: PostDTO | null;
}) {
  const router = useRouter();

  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PostErstellenFormErrors>({
    ...initialErrors,
  });
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrors(initialErrors);

    const errors = { ...initialErrors };

    if (!content) {
      errors.content = "Bitte gib eine Nachricht ein.";
    }

    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof PostErstellenFormErrors]) {
        setLoading(false);
        setErrors(errors);
        return;
      }
    });

    try {
      const body = {
        content,
        postId: post?._id,
      };

      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setOpen(false);
        setContent("");
        setSuccess(true);
      } else {
        throw new Error();
      }
    } catch (error) {
      setLoading(false);
      setErrors({
        ...errors,
        submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      });
      return;
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="btn btn-attention mt-4">
        {success ? (
          <>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Geantwortet
          </>
        ) : (
          "Antworten"
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>
          <VisuallyHidden.Root>Antworten Form Dialog</VisuallyHidden.Root>
        </DrawerTitle>
        <div className="px-6 w-full">
          {errors.submit && (
            <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
              {errors.submit}
            </div>
          )}
          <textarea
            id="content"
            className="input rounded-[20px] w-full"
            placeholder="Gib deine Nachricht ein"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>
        <DrawerFooter>
          <button className="btn btn-attention" onClick={handleSubmit}>
            <Spinner
              className={
                "fill-background transition-default " +
                (loading ? "mr-3" : "hidden")
              }
            />
            Absenden
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
