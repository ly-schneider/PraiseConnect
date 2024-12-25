import EntdeckenButton from "@/components/EntdeckenButton";
import FilterActivities from "@/components/FilterActivites";
import PostsDisplay from "@/components/PostsDisplay";
import SkeletonPostsDisplay from "@/components/skeletons/SkeletonPostsDisplay";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSession } from "@/lib/Session";
import { PostDTO } from "@/model/Post";
import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Entdecken | PraiseConnect",
  };
}

async function fetchPosts(): Promise<PostDTO[]> {
  const headersList = await headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto");
  const url = `${protocol}://${hostname}`;

  const session = await getSession();
  if (!session) return [];

  const res = await fetch(`${url}/api/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok || res.status !== 200) {
    console.error("Fehler beim Laden der Posts");
    return [];
  }

  const data = await res.json();

  return data.success ? data.data : [];
}

export default function EntdeckenPage() {
  const postsPromise = fetchPosts();

  return (
    <div className="flex flex-col mb-32">
      <header className="flex items-center justify-between mt-2">
        <Sheet>
          <SheetTrigger className="btn btn-primary py-2 px-5 group focus:border-text focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="Filter-1--Streamline-Ultimate"
              height="16"
              width="16"
              className="me-2 transition-default fill-text group-hover:fill-background"
            >
              <path
                d="M22.83 3.58A2.25 2.25 0 0 0 21 0H3a2.26 2.26 0 0 0 -2 1.24 2.22 2.22 0 0 0 0.18 2.32l7.1 10.17v8A2.26 2.26 0 0 0 10.72 24a2.92 2.92 0 0 0 1.57 -0.41l2.47 -1.54a2.27 2.27 0 0 0 0.9 -1.8v-6.51Zm-9.44 9a1.23 1.23 0 0 0 -0.23 0.72v6.48a0.5 0.5 0 0 1 -0.24 0.43l-1.41 0.83a0.5 0.5 0 0 1 -0.5 0 0.5 0.5 0 0 1 -0.25 -0.43v-7.27a1.24 1.24 0 0 0 -0.22 -0.71L4 3.29a0.51 0.51 0 0 1 0 -0.52 0.5 0.5 0 0 1 0.45 -0.27h15.11a0.5 0.5 0 0 1 0.45 0.27 0.51 0.51 0 0 1 0 0.52Z"
                strokeWidth={1}
              ></path>
            </svg>
            Filter
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <FilterActivities style="big" />
            </div>
          </SheetContent>
        </Sheet>
        <EntdeckenButton />
      </header>
      <div className="mt-2">
        <FilterActivities style="small" />
      </div>
      <Suspense fallback={<SkeletonPostsDisplay />}>
        <PostsContent postsPromise={postsPromise} />
      </Suspense>
    </div>
  );
}

async function PostsContent({ postsPromise }: { postsPromise: Promise<PostDTO[]> }) {
  const posts = await postsPromise;

  if (posts.length === 0) {
    return (
      <div className="w-full flex justify-center mt-10">
        <p className="text text-muted text-center">Keine Posts vorhanden</p>
      </div>
    );
  }

  return <PostsDisplay posts={posts} />;
}
