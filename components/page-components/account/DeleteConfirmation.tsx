"use client";

import { queryClient } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";
import { deleteLink } from "@/lib/services";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export function DeleteConfirmation() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [deleteData, setDeleteData, dialogOpen] = useLinkDialogStore(
    (state) => [state.data, state.setData, state.setOpen],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkLists"] });
      setDeleteData(null);
      dialogOpen(false);
    },
  });

  const onCancel = () => {
    dialogOpen(false);
    setDeleteData(null);
  };

  const onDelete = () => {
    mutate(deleteData?.id!);
  };

  return (
    <div className={!isDesktop ? "p-4" : ""}>
      <h1 className="text-xl">
        You will deleting <span className="font-bold">{deleteData?.title}</span>
        , are you sure?
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={onCancel} className="bg-slate-500 hover:bg-slate-400">
          Nevermind
        </Button>
        <Button
          onClick={onDelete}
          variant="destructive"
          disabled={isPending}
          className="space-x-4"
        >
          {isPending && <LoaderCircleIcon size={16} className="animate-spin" />}
          Yes, Delete!
        </Button>
      </div>
    </div>
  );
}
