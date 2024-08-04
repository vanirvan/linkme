"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getLink } from "@/lib/services/getLink";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { LinkDialog } from "@/components/page-components/account/LinkDialog";
import { LinkCard } from "@/components/page-components/account/LinkCard";

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

  useEffect(() => {
    if (!isFetching) {
      setLinks(linkList?.data!);
    }
  }, [isFetching, linkList]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div></div>
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

      <div className="flex flex-col gap-4">
        {links.map((l, key) => (
          <LinkCard key={key} props={l} />
        ))}
      </div>

      <LinkDialog />
    </>
  );
}
