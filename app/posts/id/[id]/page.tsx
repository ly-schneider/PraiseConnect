import { headers } from "next/headers";
import { getSession } from "@/lib/Session";
import { PostDTO } from "@/model/Post";
import BackButton from "@/components/BackButton";
import Post from "@/components/Post";
import AntwortErstellenForm from "@/components/AntwortErstellenForm";
import { Suspense } from "react";
import SkeletonPostDetail from "@/components/skeletons/SkeletonPostDetail";
import { Metadata } from "next";
import PostOptionsButton from "@/components/PostOptionsButton";
import { JWTPayload } from "jose";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Post | PraiseConnect",
  };
}

async function fetchPostData(id: string): Promise<PostDTO | null> {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();

  if (!session) return null;

  const res = await fetch(`${url}/api/posts/id/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    console.error("Fehler beim Laden der Posts");
    return null;
  }

  const data = await res.json();

  if (data.success) {
    return data.data;
  } else {
    console.error("Fehler beim Laden der Posts");
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getSession();

  const postPromise = fetchPostData(id);

  return (
    <div className="flex flex-col mb-32 mt-2">
      <div className="flex items-center justify-between">
        <BackButton />
        <Suspense>
          <PostOptionsButtonLoader postPromise={postPromise} session={session} />
        </Suspense>
      </div>
      <Suspense fallback={<SkeletonPostDetail />}>
        <PostContent postPromise={postPromise} />
      </Suspense>
    </div>
  );
}

async function PostContent({
  postPromise,
}: {
  postPromise: Promise<PostDTO | null>;
}) {
  const post = await postPromise;

  if (!post) {
    return (
      <p className="text-center text mt-8">Fehler beim Laden des Posts.</p>
    );
  }

  const session = await getSession();

  return (
    <>
      <Post post={post} type="single" />
      <AntwortErstellenForm session={session} post={post} />
    </>
  );
}

async function PostOptionsButtonLoader({
  postPromise,
  session,
}: {
  postPromise: Promise<PostDTO | null>;
  session: { accessToken: string; user: JWTPayload } | null;
}) {
  const post = await postPromise;

  if (!post) {
    return null;
  }

  return (post.account?._id === session?.user?._id) && <PostOptionsButton post={post} session={session} />;
}