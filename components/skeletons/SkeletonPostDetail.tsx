import { Skeleton } from "../ui/skeleton";

export default function SkeletonPostDetail() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Skeleton className="h-[125px] w-full rounded-[20px]" />
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}
