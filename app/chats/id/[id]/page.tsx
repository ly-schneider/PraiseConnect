import ChatDisplay from "@/components/ChatDisplay";
import Spinner from "@/components/utils/Spinner";
import { getSession } from "@/lib/Session";
import { ChatDTO } from "@/model/Chat";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chat | PraiseConnect",
  };
}

async function fetchChat(id: string): Promise<ChatDTO | null> {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();
  if (!session) return null;

  const res = await fetch(`${url}/api/chats/id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok || res.status !== 200) {
    console.error("Fehler beim Laden der Chats");
    return null;
  }

  const data = await res.json();

  return data.success ? data.data : null;
}

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chatPromise = fetchChat(id);

  return (
    <div className="flex flex-col mb-32 mt-2">
      <Suspense fallback={<LoadingFallback />}>
        <ChatContent chatPromise={chatPromise} />
      </Suspense>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full flex justify-center mt-12">
      <Spinner className="fill-text w-8 h-8" />
    </div>
  );
}

async function ChatContent({ chatPromise }: { chatPromise: Promise<ChatDTO | null> }) {
  const chat = await chatPromise;

  if (!chat) {
    return (
      <div className="w-full flex justify-center mt-12">
        <p className="text text-center">Fehler beim Laden der Chats</p>
      </div>
    );
  }

  const session = await getSession();

  return <ChatDisplay chat={chat} session={session} />;
}