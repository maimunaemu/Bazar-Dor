export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div className="skeleton h-6 w-20" />
        <div className="skeleton h-5 w-12" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}