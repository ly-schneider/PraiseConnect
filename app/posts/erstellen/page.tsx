import BackButton from "@/components/BackButton";
import PostErstellenForm from "@/components/PostErstellenForm";
import { getSession } from "@/lib/Session";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Post erstellen | PraiseConnect",
  };
}

export default async function PostErstellenPage() {
  const session = await getSession();

  return (
    <div className="flex flex-col mb-32 mt-2">
      <BackButton />
      <h1 className="title text-4xl mt-5">Post erstellen</h1>
      <PostErstellenForm session={session} />
    </div>
  );
}
