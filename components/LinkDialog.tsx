"use client";

import { useEffect, useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "usehooks-ts";
import { LoaderCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { queryClient } from "@/components/providers/QueryProvider";

import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { postLink, deleteLink, updateLink } from "@/lib/services";

interface FormState {
  title: string;
  link: string;
}

function useFormState(dialogData: any) {
  const [form, setForm] = useState<FormState>({ title: "", link: "" });

  useEffect(() => {
    setForm({
      title: dialogData?.title || "",
      link: dialogData?.link || "",
    });
  }, [dialogData]);

  return [form, setForm] as const;
}

function useMutations() {
  const { mutate: mutatePost, isPending: isPendingPost } = useMutation({
    mutationFn: postLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkLists"] });
    },
  });

  const { mutate: mutateEdit, isPending: isPendingEdit } = useMutation({
    mutationFn: updateLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linkLists"] }),
  });

  const { mutate: mutateDelete, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["linkLists"] }),
  });

  return {
    mutatePost,
    mutateEdit,
    mutateDelete,
    isPendingPost,
    isPendingEdit,
    isPendingDelete,
  };
}

function DialogForm({
  form,
  setForm,
  onSubmit,
  dialogOpenType,
  isPending,
}: any) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium leading-none">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title of your link here"
          value={form.title}
          onChange={(e) =>
            setForm((prev: FormState) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-sm font-medium leading-none">
          Link
        </label>
        <Input
          id="link"
          name="link"
          type="url"
          placeholder="Paste link destination here"
          value={form.link}
          onChange={(e) =>
            setForm((prev: FormState) => ({ ...prev, link: e.target.value }))
          }
        />
      </div>
      <Button
        size="sm"
        type="submit"
        disabled={isPending}
        className={`ml-auto text-white ${
          dialogOpenType === "add"
            ? "bg-blue-500 hover:bg-blue-400"
            : "bg-yellow-500 hover:bg-yellow-400"
        }`}
      >
        {isPending && <LoaderCircleIcon size={16} />}
        {dialogOpenType === "add" ? "Add new Link" : "Edit Link"}
      </Button>
    </form>
  );
}

function DeleteConfirmation({
  dialogData,
  onCancel,
  onDelete,
  isPending,
}: any) {
  return (
    <>
      <h1 className="text-xl">
        You will deleting <span className="font-bold">{dialogData?.title}</span>
        , are you sure?
      </h1>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={onCancel} className="bg-slate-500 hover:bg-slate-400">
          Nevermind
        </Button>
        <Button onClick={onDelete} variant="destructive" disabled={isPending}>
          {isPending && <LoaderCircleIcon size={16} />}
          Yes, Delete!
        </Button>
      </div>
    </>
  );
}

export function LinkDialog() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const {
    mutatePost,
    mutateEdit,
    mutateDelete,
    isPendingPost,
    isPendingEdit,
    isPendingDelete,
  } = useMutations();

  const [
    isDialogOpen,
    setDialogOpen,
    dialogData,
    setDialogData,
    dialogOpenType,
    setDialogOpenType,
  ] = useLinkDialogStore((state) => [
    state.isOpen,
    state.setOpen,
    state.data,
    state.setData,
    state.openType,
    state.setOpenType,
  ]);

  const [form, setForm] = useFormState(dialogData);

  const onInteractOutside = () => setDialogData(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (dialogOpenType === "add") {
      mutatePost({ title: form.title, url: form.link });
    } else if (dialogOpenType === "edit") {
      mutateEdit({ id: dialogData?.id!, title: form.title, url: form.link });
    }
    setDialogOpen(false);
    setDialogOpenType(null);
  };

  const handleDelete = () => {
    mutateDelete(dialogData?.id!);
    setDialogOpen(false);
    setDialogData(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setDialogData(null);
  };

  const renderContent = () => {
    if (dialogOpenType === "add" || dialogOpenType === "edit") {
      return (
        <DialogForm
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          dialogOpenType={dialogOpenType}
          isPending={isPendingPost || isPendingEdit}
        />
      );
    } else {
      return (
        <DeleteConfirmation
          dialogData={dialogData}
          onCancel={handleCancel}
          onDelete={handleDelete}
          isPending={isPendingDelete}
        />
      );
    }
  };

  return isDesktop ? (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent onInteractOutside={onInteractOutside}>
        <DialogHeader>
          <DialogTitle>
            {dialogOpenType === "add"
              ? "Add new Link"
              : dialogOpenType === "edit"
                ? "Edit Link"
                : "Delete Link"}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DrawerContent onInteractOutside={onInteractOutside}>
        <DrawerHeader>
          <DrawerTitle>
            {dialogOpenType === "add"
              ? "Add new Link"
              : dialogOpenType === "edit"
                ? "Edit Link"
                : "Delete Link"}
          </DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        {renderContent()}
      </DrawerContent>
    </Drawer>
  );
}
