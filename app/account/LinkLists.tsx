"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PlusIcon, ArrowUpDownIcon } from "lucide-react";
import { ReactSortable } from "react-sortablejs";

import { Button } from "@/components/ui/button";
import { getLink } from "@/lib/services/getLink";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { LinkDialog } from "@/components/page-components/account/LinkDialog";
import { LinkCard } from "@/components/page-components/account/LinkCard";
import { changeOrder } from "@/lib/services/changeOrder";
import { queryClient } from "@/components/providers/QueryProvider";

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

  const { data: linkList, isFetching } = useQuery<{
    data: {
      id: number;
      title: string;
      link: string;
      order: number;
      createdAt: string;
    }[];
  }>({
    queryKey: ["linkLists"],
    queryFn: getLink,
    staleTime: Infinity,
  });

  const [setDialogOpen, setDialogOpenType] = useLinkDialogStore((state) => [
    state.setOpen,
    state.setOpenType,
  ]);

  const { mutate: mutateOrder, isPending: saveOrderPending } = useMutation({
    mutationFn: changeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkLists"] });
    },
  });

  const saveOrder = () => {
    mutateOrder(links);
  };

  useEffect(() => {
    if (!isFetching) {
      setLinks(linkList?.data!);
    }
  }, [isFetching, linkList]);

  return (
    <>
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
      <div className="flex items-center justify-center">
        <Button
          size={"sm"}
          onClick={saveOrder}
          disabled={saveOrderPending}
          className="flex items-center gap-4 bg-blue-500 text-sm hover:bg-blue-400"
        >
          <ArrowUpDownIcon size={16} color="white" />
          Save Link Sequences
        </Button>
      </div>

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

      <LinkDialog />
    </>
  );
}
