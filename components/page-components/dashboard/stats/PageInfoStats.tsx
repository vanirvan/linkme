"use client";

import { useCopyToClipboard, useIsClient } from "usehooks-ts";
import { ExternalLinkIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { LoadingSkeleton } from "./LoadingStats";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function PageInfoStats() {
  const isClient = useIsClient();

  const { data: userInfoData, isPending: userInfoPending } = useQuery<{
    data: { name: string; username: string | null; image: string };
  }>({
    queryKey: ["UserInfo"],
    staleTime: Infinity,
  });

  const [copiedText, copy] = useCopyToClipboard();
  const onCopy = () => {
    copy(`${process.env.NEXT_PUBLIC_APP_URL}/${userInfoData?.data.username}`);
    toast("Your page link has been copied", {
      description: copiedText,
    });
  };

  return isClient ? (
    <div className="flex w-full flex-grow flex-col gap-4 rounded bg-white p-4 shadow-md md:flex-grow-0">
      <h1>Your Page</h1>
      {!userInfoPending ? (
        <h2 className="break-words text-sm">
          {!userInfoData?.data.username ? (
            "You don't have page"
          ) : (
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${userInfoData.data.username}`}
              target="_blank"
              className="underline"
            >
              {process.env.NEXT_PUBLIC_APP_URL}/{userInfoData.data.username}
            </a>
          )}
        </h2>
      ) : (
        <Skeleton className="h-5 w-72" />
      )}
      {!userInfoPending && userInfoData?.data.username ? (
        <div className="flex items-center gap-2">
          <Button onClick={onCopy} variant={"outline"} size={"sm"}>
            Copy
          </Button>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/${userInfoData.data.username}`}
            target="_blank"
          >
            <Button variant={"outline"} size={"icon"}>
              <ExternalLinkIcon size={16} />
            </Button>
          </a>
        </div>
      ) : null}
    </div>
  ) : (
    <LoadingSkeleton />
  );
}
