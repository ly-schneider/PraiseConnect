import { Skeleton } from "../ui/skeleton";

export default function SkeletonPostsDisplay() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Skeleton className="h-[125px] w-full rounded-[20px]" />
      <Skeleton className="h-[80px] w-full rounded-[20px]" />
      <Skeleton className="h-[100px] w-full rounded-[20px]" />
      <Skeleton className="h-[125px] w-full rounded-[20px]" />
    </div>
  );
}
