import Chat from "@/components/Chat";
import { getSession } from "@/lib/Session";
import { ChatDTO } from "@/model/Chat";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ChatsPage() {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();

  let chats: ChatDTO[] = [];

  if (session) {
    const res = await fetch(`${url}/api/chats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok || res.status !== 200) {
      console.error("Fehler beim Laden der Chats");
      return;
    }

    const data = await res.json();

    if (data.success) {
      chats = data.data;
    } else {
      console.error("Fehler beim Laden der Chats");
    }
  }

  return (
    <div className="flex flex-col mb-32 mt-2">
      {chats.length === 0 ? (
        <p className="text text-muted text-center mt-10">Keine Chats vorhanden</p>
      ) : (
        chats.map((chat) => (
          <Link key={chat._id} href={`/chats/id/${chat._id}`}>
            <Chat chat={chat} accountId={session?.user._id as string} />
          </Link>
        ))
      )}
    </div>
  );
}
