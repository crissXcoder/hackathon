import { Skeleton } from "@/components/ui/skeleton";

export function DeviceDetailSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      {/* Header section */}
      <div className="bg-surface-container-lowest border border-border-hairline rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        <div className="h-px bg-border-hairline w-full my-6" />

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-2 border-x border-border-hairline px-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="space-y-2 pl-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Peaks History Section */}
      <div className="bg-surface-container-lowest border border-border-hairline rounded-xl p-6">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center p-3 border border-border-hairline rounded-lg">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
