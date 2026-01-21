import Skeleton from "../ui/Skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />

      <div className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
