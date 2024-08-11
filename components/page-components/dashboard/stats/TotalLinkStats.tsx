"use client";

import { useQuery } from "@tanstack/react-query";
import { useIsClient } from "usehooks-ts";

import { getLinkList } from "@/lib/services/";
import { LoadingSkeleton } from "./LoadingStats";
import { Skeleton } from "@/components/ui/skeleton";

export function TotalLinkStats() {
  const isClient = useIsClient();

  const { data: linkListData, isPending: linkListPending } = useQuery({
    queryKey: ["LinkLists"],
    queryFn: getLinkList,
    staleTime: Infinity,
  });

  return isClient ? (
    <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
      <h1>Total Links</h1>
      {!linkListPending ? (
        <h2 className="text-2xl font-bold">{linkListData?.data.length}</h2>
      ) : (
        <Skeleton className="h-5 w-12" />
      )}
    </div>
  ) : (
    <LoadingSkeleton />
  );
}
