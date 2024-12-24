"use client";

import { useState } from "react";
import Spinner from "./utils/Spinner";
import { JWTPayload } from "jose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { ChatMessageDTO } from "@/model/Chat";

interface MessageInputErrors {
  message: string;
  submit: string;
}

const initialErrors: MessageInputErrors = {
  message: "",
  submit: "",
};

export default function MessageInputBox({
  session,
  chatId,
  chatMessages,
  setChatMessages,
}: {
  session: { accessToken: string; user: JWTPayload } | null;
  chatId: string;
  chatMessages: ChatMessageDTO[] | undefined;
  setChatMessages: (messages: ChatMessageDTO[] | undefined) => void;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<MessageInputErrors>(initialErrors);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();

    setErrors(initialErrors);

    if (!message.trim()) {
      setErrors({ ...errors, message: "Nachricht darf nicht leer sein." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/chats/id/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ content: message.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("Failed to send message");
      }

      if (!chatMessages) {
        return;
      }

      setMessage("");
      setLoading(false);
      setChatMessages([...chatMessages, data.data]);
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({
        ...errors,
        submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      });
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-24 z-50 w-full max-w-md bg-background py-4">
      {errors.submit && (
        <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleSend} className="flex items-end gap-2 mx-6">
        <textarea
          className="flex-grow resize-none px-4 py-2 input rounded-[20px]"
          rows={3}
          placeholder="Schreibe eine Nachricht..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="p-0 w-10 h-10 btn btn-attention"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <Spinner className={"fill-background transition-default"} />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )}
        </button>
      </form>
    </div>
  );
}
