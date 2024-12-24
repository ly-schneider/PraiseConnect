import BackButton from "@/components/BackButton";
import ChatDisplay from "@/components/ChatDisplay";
import Spinner from "@/components/utils/Spinner";
import { getSession } from "@/lib/Session";
import { ChatDTO } from "@/model/Chat";
import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chat | PraiseConnect"
  };
}

export default async function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();

  let chat: ChatDTO | null = null;

  if (session) {
    const res = await fetch(`${url}/api/chats/id/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok || res.status !== 200) {
      console.error("Fehler beim Laden der Chats");
      return (
        <div className="w-full flex justify-center mt-12">
          <p className="text text-center">Fehler beim Laden der Chats</p>
        </div>
      );
    }

    const data = await res.json();

    if (data.success) {
      chat = data.data;
    } else {
      console.error("Fehler beim Laden der Chats");
    }
  }

  console.log(chat);

  return (
    <div className="flex flex-col mb-32 mt-2">
      {!chat ? (
        <div className="w-full flex justify-center">
          <Spinner className="fill-text w-8 h-8" />
        </div>
      ) : (
        <ChatDisplay chat={chat} session={session} />
      )}
    </div>
  );
}
