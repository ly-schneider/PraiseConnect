import Chat from "@/components/Chat";
import SkeletonChatsDisplay from "@/components/skeletons/SkeletonChatsDisplay";
import { getSession } from "@/lib/Session";
import { ChatDTO } from "@/model/Chat";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chats | PraiseConnect",
  };
}

async function fetchChats(): Promise<ChatDTO[]> {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();
  if (!session) return [];

  const res = await fetch(`${url}/api/chats`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok || res.status !== 200) {
    console.error("Fehler beim Laden der Chats");
    return [];
  }

  const data = await res.json();

  return data.success ? data.data : [];
}

export default function ChatsPage() {
  const chatsPromise = fetchChats();

  return (
    <div className="flex flex-col mb-32 mt-2">
      <Suspense fallback={<SkeletonChatsDisplay />}>
        <ChatsContent chatsPromise={chatsPromise} />
      </Suspense>
    </div>
  );
}

async function ChatsContent({ chatsPromise }: { chatsPromise: Promise<ChatDTO[]> }) {
  const chats = await chatsPromise;

  if (chats.length === 0) {
    return (
      <p className="text text-muted text-center mt-10">Keine Chats vorhanden</p>
    );
  }

  const session = await getSession();

  console.log(chats)

  const sortedChats = chats.sort((a, b) => {
    if (a.messages === undefined || b.messages === undefined) return 0;

    const latestMessageA = a.messages[a.messages.length - 1]?.createdAt || 0;
    const latestMessageB = b.messages[b.messages.length - 1]?.createdAt || 0;

    return new Date(latestMessageB).getTime() - new Date(latestMessageA).getTime();
  });

  return (
    <>
      {sortedChats.map((chat) => (
        <Link key={chat._id} href={`/chats/id/${chat._id}`}>
          <Chat chat={chat} accountId={session?.user._id as string} />
        </Link>
      ))}
    </>
  );
}
