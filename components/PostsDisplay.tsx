"use client";

import { useActivities } from "./FilterActivitiesContext";
import { PostDTO } from "@/model/Post";
import Link from "next/link";
import Post from "./Post";

export default function PostsDisplay({ posts }: { posts: PostDTO[] }) {
  const { selectedActivities } = useActivities();

  const filteredPosts =
    selectedActivities.length === 0
      ? posts
      : posts.filter((post) =>
          post.activities?.some((activity) =>
            selectedActivities.includes(activity)
          )
        );

  return (
    <ul className="flex flex-col gap-3 mt-5">
      {filteredPosts.map((post) => (
        <Link
          key={post._id}
          href={`/posts/id/${post._id}`}
        >
          <Post post={post} type="list" />
        </Link>
      ))}
    </ul>
  );
}
