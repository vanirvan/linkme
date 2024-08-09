"use client";

import { useQuery } from "@tanstack/react-query";
import { useIsClient } from "usehooks-ts";

import { getLinkList } from "@/lib/services/get/getLinkList";
import { LoadingSkeleton } from "./LoadingStats";

export function TotalLinkStats() {
  const isClient = useIsClient();

  const { data: linkListData, isPending: linkListPending } = useQuery({
    queryKey: ["LinkLists"],
    queryFn: getLinkList,
    staleTime: Infinity,
  });

  return isClient && !linkListPending ? (
    <div className="flex w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
      <h1>Total Links</h1>
      <h2 className="text-2xl font-bold">{linkListData?.data.length}</h2>
    </div>
  ) : (
    <LoadingSkeleton />
  );
}
