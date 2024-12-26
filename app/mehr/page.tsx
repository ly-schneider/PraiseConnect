import MoreList from "@/components/MoreList";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mehr | PraiseConnect",
  };
}

export default function MehrPage() {
  return (
    <div className="flex flex-col mb-32 mt-8">
      <h1 className="title text-4xl">Mehr</h1>
      <MoreList />
    </div>
  );
}
