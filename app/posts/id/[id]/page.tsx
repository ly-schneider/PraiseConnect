import AntwortErstellenForm from "@/components/AntwortErstellenForm";
import BackButton from "@/components/BackButton";
import Post from "@/components/Post";
import Spinner from "@/components/utils/Spinner";
import { getSession } from "@/lib/Session";
import { PostDTO } from "@/model/Post";
import { headers } from "next/headers";

export default async function PostDetailPage({
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

  let post: PostDTO | null = null;

  if (session) {
    const res = await fetch(`${url}/api/posts/id/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok || res.status !== 200) {
      console.error("Fehler beim Laden der Posts");
      return;
    }

    const data = await res.json();

    if (data.success) {
      post = data.data;
    } else {
      console.error("Fehler beim Laden der Posts");
    }
  }

  return (
    <div className="flex flex-col mb-32 mt-2">
      <BackButton />
      {!post ? (
        <div className="w-full flex justify-center">
          <Spinner className="fill-text w-8 h-8" />
        </div>
      ) : (
        <Post post={post} type="single" />
      )}
      <AntwortErstellenForm session={session} post={post} />
    </div>
  );
}
