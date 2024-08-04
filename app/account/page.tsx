"use client";

import { useQuery } from "@tanstack/react-query";

import { AccountInfoPage } from "@/app/account/AccountInfoPage";
import { ClaimAccontPage } from "@/app/account/ClaimAccountPage";
import { LinkLists } from "@/app/account/LinkLists";
import { Skeleton } from "@/components/ui/skeleton";

import { useIsClient } from "@/lib/utils/isClient";
import { getUserPage } from "@/lib/services/getUserPage";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export default function AccountPage() {
  const isClient = useIsClient();

  const { data: userPageData, isLoading } = useQuery({
    queryKey: ["userPage"],
    queryFn: getUserPage,
    staleTime: Infinity,
  });

  return (
    <div className="relative w-full">
      <div className="mx-auto mb-8 mt-20 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4 lg:grid-cols-5">
        {isClient && !isLoading ? (
          <>
            <div className="col-span-1 flex flex-col gap-4">
              <div className="flex flex-col gap-4 rounded bg-white p-4 shadow-md">
                <h1>Total Links</h1>
                <h2 className="text-2xl font-bold">0</h2>
              </div>
              <div className="flex flex-col gap-4 rounded bg-white p-4 shadow-md">
                <h1>Total Visitors</h1>
                <h2 className="text-2xl font-bold">0</h2>
              </div>
              {userPageData?.data.username ? (
                <div className="flex flex-col gap-4 rounded bg-white p-4 shadow-md">
                  <h1>Your Page</h1>
                  <h2 className="break-words text-sm">
                    {!userPageData?.data.username ? (
                      "You don't have page"
                    ) : (
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/${userPageData?.data.username}`}
                        target="_blank"
                        className="underline"
                      >
                        {process.env.NEXT_PUBLIC_APP_URL}/
                        {userPageData?.data.username}
                      </a>
                    )}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Button variant={"outline"} size={"sm"}>
                      Copy
                    </Button>
                    <Button variant={"outline"} size={"sm"}>
                      Share
                    </Button>
                    <a
                      href={`${process.env.NEXT_PUBLIC_APP_URL}/${userPageData?.data.username}`}
                      target="_blank"
                    >
                      <Button variant={"outline"} size={"icon"}>
                        {" "}
                        <ExternalLinkIcon size={16} />{" "}
                      </Button>
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-span-1 w-full rounded md:col-span-3">
              <div className="flex flex-col gap-4 rounded bg-white p-4 shadow-md">
                {!userPageData?.data.username ? (
                  <ClaimAccontPage />
                ) : (
                  <LinkLists />
                )}
              </div>
            </div>

            <div className="col-span-1 flex h-min w-full flex-col gap-4 rounded bg-white p-4 shadow-md">
              <AccountInfoPage />
            </div>
          </>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="col-span-1 flex flex-col gap-8">
        <Skeleton className="h-24 w-full rounded" />
        <Skeleton className="h-24 w-full rounded" />
        <Skeleton className="h-24 w-full rounded" />
      </div>
      <Skeleton className="col-span-1 h-96 w-full rounded md:col-span-3" />
      <Skeleton className="col-span-1 h-96 w-full rounded" />
    </>
  );
}
