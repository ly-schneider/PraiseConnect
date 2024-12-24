"use client";

import { ChatDTO } from "@/model/Chat";
import { JWTPayload } from "jose";
import { GetParticipantThatIsNotSelf } from "./utils/ChatHelpers";
import CalcBirthdate from "./utils/CalcBirthdate";
import CalcCreationDate from "./utils/CalcCreationDate";
import MessageInputBox from "./MessageInputBox";
import { useState } from "react";
import BackButton from "./BackButton";
import RenderMarkdown from "./utils/RenderMarkdown";

export default function ChatDisplay({
  chat,
  session,
}: {
  chat: ChatDTO;
  session: { accessToken: string; user: JWTPayload } | null;
}) {
  const [chatMessages, setChatMessages] = useState(chat.messages);

  return (
    <>
      <div className="flex flex-col mb-32">
        <div className="fixed top-0 bg-background w-full max-w-md pb-2 pt-5">
          <div className="flex items-center justify-between w-full">
            <BackButton />
            <h1 className="title text-2xl">
              {
                GetParticipantThatIsNotSelf(chat, session?.user._id as string)
                  ?.name
              }
              ,{" "}
              {CalcBirthdate(
                GetParticipantThatIsNotSelf(chat, session?.user._id as string)
                  ?.birthdate
              )}
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mt-20 space-y-4">
          {chatMessages?.map((message, index) => {
            const isSelf = message.sender?._id === session?.user._id;
            const isLastRead =
              chat.readBy instanceof Map &&
              chat.readBy.get(session?.user._id as string)?.toISOString() ===
                message.createdAt?.toISOString();

            return (
              <div
                key={index}
                className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 max-w-[75%] border-2 border-text rounded-[20px] ${
                    isSelf ? "text-right" : "text-left"
                  }`}
                >
                  <RenderMarkdown content={message.content} />
                  <p className="text text-xs mt-2 text-muted">
                    {CalcCreationDate(message.createdAt)}
                  </p>
                </div>
                {isLastRead && (
                  <div className="text-xs text-gray-400 italic self-end ml-2">
                    Gelesen
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <MessageInputBox
        session={session}
        chatId={chat._id as string}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </>
  );
}
