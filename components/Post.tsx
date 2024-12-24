import { PostDTO } from "@/model/Post";
import CalcBirthdate from "./utils/CalcBirthdate";
import CalcCreationDate from "./utils/CalcCreationDate";
import TextareaToReadable from "./utils/TextareaToReadable";

export default function Post({ post, type }: { post: PostDTO, type: "list" | "single" }) {
  return type === "list" ? (
    <li className="border-2 border-text px-4 py-3 rounded-[20px]">
      <div className="flex items-center justify-between">
        <p className="text font-bold text-base">
          {post.account?.name}, {CalcBirthdate(post.account?.birthdate)}
        </p>
        <p className="text text-muted">{CalcCreationDate(post.createdAt)}</p>
      </div>
      <p className="text mt-2">{TextareaToReadable(post.content)}</p>
    </li>
  ) : (
    <div className="border-2 border-text px-4 py-3 rounded-[20px] mt-4">
      <div className="flex items-center justify-between">
        <p className="text font-bold text-base">
          {post.account?.name}, {CalcBirthdate(post.account?.birthdate)}
        </p>
        <p className="text text-muted">{CalcCreationDate(post.createdAt)}</p>
      </div>
      <p className="text mt-2">{TextareaToReadable(post.content)}</p>
    </div>
  );
}
