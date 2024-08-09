"use client";

import { useIsClient } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { LinkLists } from "@/components/page-components/dashboard/LinkLists";
import { DashboardClaimLink } from "@/components/page-components/dashboard/DashboardClaimLink";

export function DashboardLinkLists() {
  const isClient = useIsClient();

  const { data: userInfoData, isPending: userInfoPending } = useQuery<{
    data: { name: string; username: string | null; image: string };
  }>({
    queryKey: ["UserInfo"],
  });

  return isClient && !userInfoPending ? (
    userInfoData?.data.username ? (
      <div className="rounded bg-white p-4 shadow-md">
        <LinkLists />
      </div>
    ) : (
      <div className="rounded bg-white p-4 shadow-md">
        <DashboardClaimLink />
      </div>
    )
  ) : (
    <LoadingSkeleton />
  );
}

function LoadingSkeleton() {
  return <Skeleton className="h-96 w-full rounded" />;
}
