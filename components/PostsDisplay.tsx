"use client";

import { useActivities } from "./FilterActivitiesContext";
import { PostDTO } from "@/model/Post";
import CalcBirthdate from "./utils/CalcBirthdate";
import CalcCreationDate from "./utils/CalcCreationDate";
import TextareaToReadable from "./utils/TextareaToReadable";
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
          href={`/post/id/${post._id}`}
        >
          <Post post={post} type="list" />
        </Link>
      ))}
    </ul>
  );
}