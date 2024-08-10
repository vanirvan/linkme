"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon, ArrowUpDownIcon } from "lucide-react";
import { ReactSortable } from "react-sortablejs";

import { LinkDialog } from "@/components/page-components/dashboard/LinkDialog";
import { LinkCard } from "@/components/page-components/dashboard/LinkCard";
import { queryClient } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { getLink, changeOrder } from "@/lib/services/";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";

export function LinkLists() {
  const [links, setLinks] = useState<
    {
      id: number;
      title: string;
      link: string;
      order: number;
      createdAt: string;
    }[]
  >([]);

  const { data: linkList, isPending } = useQuery<{
    data: {
      id: number;
      title: string;
      link: string;
      order: number;
      createdAt: string;
    }[];
  }>({
    queryKey: ["LinkLists"],
    queryFn: getLink,
    staleTime: Infinity,
  });

  const [setDialogOpen, setDialogOpenType] = useLinkDialogStore((state) => [
    state.setOpen,
    state.setOpenType,
  ]);

  const { mutate: mutateOrder, isPending: saveOrderPending } = useMutation({
    mutationFn: changeOrder,
  });

  const saveOrder = () => {
    mutateOrder(links);
  };

  useEffect(() => {
    if (!isPending) {
      setLinks(linkList?.data!);
    }
  }, [isPending, linkList]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button
          size={"sm"}
          className="bg-blue-500 text-sm hover:bg-blue-400"
          onClick={() => {
            setDialogOpen(true);
            setDialogOpenType("add");
          }}
        >
          <PlusIcon size={16} color="white" />
          Add
        </Button>
      </div>

      {!isPending && links.length > 0 ? (
        <div className="flex items-center justify-center">
          <Button
            size={"sm"}
            onClick={saveOrder}
            disabled={saveOrderPending}
            className="flex items-center gap-4 bg-blue-500 text-sm hover:bg-blue-400"
          >
            <ArrowUpDownIcon size={16} color="white" />
            Save Link Order
          </Button>
        </div>
      ) : null}

      {isPending ? (
        <LoadingSkeleton />
      ) : links.length > 0 ? (
        <ReactSortable
          list={links}
          setList={setLinks}
          animation={200}
          delayOnTouchOnly={true}
          delay={200}
          className="flex flex-col gap-4"
        >
          {links.map((l, key) => (
            <LinkCard key={key} props={l} />
          ))}
        </ReactSortable>
      ) : (
        <div className="relative flex w-full flex-col items-center gap-4 py-8">
          <Image
            src={"/empty.svg"}
            alt="empty lists image"
            width={240}
            height={240}
            objectFit="contain"
          />
          <span>You have no links</span>
        </div>
      )}

      <LinkDialog />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
      <Skeleton className="h-32 w-full rounded" />
    </div>
  );
}
