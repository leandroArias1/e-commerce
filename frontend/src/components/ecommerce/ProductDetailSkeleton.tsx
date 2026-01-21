import Skeleton from "../ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <Skeleton className="aspect-[3/4] w-full" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-6 w-24" />

        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}
