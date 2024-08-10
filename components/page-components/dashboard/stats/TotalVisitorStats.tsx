"use client";

import { useIsClient } from "usehooks-ts";

import { LoadingSkeleton } from "./LoadingStats";
import { useQuery } from "@tanstack/react-query";
import { getAnalytic } from "@/lib/services";
import { Skeleton } from "@/components/ui/skeleton";

export function TotalVisitorStats() {
  const isClient = useIsClient();

  const { data: totalVisitorData, isPending: totalVisitorPending } = useQuery({
    queryKey: ["Analytics"],
    queryFn: getAnalytic,
    staleTime: Infinity,
  });

  return isClient ? (
    <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
      <h1>Total Visitors</h1>
      {!totalVisitorPending ? (
        <h2 className="text-2xl font-bold">
          {totalVisitorData?.data.total_visitor}
        </h2>
      ) : (
        <Skeleton className="h-5 w-12" />
      )}
    </div>
  ) : (
    <LoadingSkeleton />
  );
}
