"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactSortable } from "react-sortablejs";

import { queryClient } from "@/components/providers/QueryProvider";
import { getLink } from "@/lib/services/getLink";
import { changeOrder } from "@/lib/services/changeOrder";
import { deleteLink } from "@/lib/services/deleteLink";

export function LinkList() {
  const [linkList, setLinkList] = useState<
    {
      id: number;
      title: string;
      link: string;
      order: number;
      createdAt: string;
    }[]
  >([]);

  const { data, status } = useQuery<{
    data: {
      id: number;
      title: string;
      link: string;
      order: number;
      createdAt: string;
    }[];
  }>({
    queryKey: ["links"],
    queryFn: getLink,
    staleTime: Infinity,
  });

  const saveOrderMutation = useMutation({
    mutationFn: changeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const onDeleteLink = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  useEffect(() => {
    if (status == "success") {
      setLinkList(data?.data!);
    }
  }, [status, data?.data]);

  return (
    <>
      <ReactSortable
        list={linkList}
        setList={setLinkList}
        animation={200}
        delayOnTouchOnly={true}
        delay={2}
        className="space-y-2"
      >
        {status == "success" &&
          linkList.map((d) => (
            <div key={d.id} className="space-y-2 bg-blue-700">
              <p>{d.title}</p>
              <p>{d.link}</p>
              <button
                onClick={() => onDeleteLink.mutate(d.id)}
                className="bg-red-500 px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))}
      </ReactSortable>
      <button
        onClick={() => saveOrderMutation.mutate(linkList)}
        className="my-8 bg-blue-500 px-4 py-2"
      >
        Save
      </button>
    </>
  );
}
