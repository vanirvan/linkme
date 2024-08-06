"use client";

import { queryClient } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postLink, updateLink } from "@/lib/services";
import { useLinkDialogStore } from "@/lib/store/useLinkDialogStore";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export function LinkDialogForm() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [input, setInput] = useState<{ title: string; link: string }>({
    title: "",
    link: "",
  });

  const [formData, setFormData, formType, setDialogOpen] = useLinkDialogStore(
    (state) => [state.data, state.setData, state.openType, state.setOpen],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: formType === "add" ? postLink : updateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkLists"] });
      setFormData(null);
      setDialogOpen(false);
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: formData?.id!, title: input.title, url: input.link });
  };

  useEffect(() => {
    if (formType === "edit" && formData !== null) {
      setInput((prev) => ({ title: formData?.title!, link: formData?.link! }));
    }
  }, [formType, formData]);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-4 ${!isDesktop ? "p-4" : null}`}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-sm font-medium leading-none">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Title of your link here"
          value={input.title}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, title: e.target.value }))
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
          value={input.link}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, link: e.target.value }))
          }
        />
      </div>
      <Button
        size="sm"
        type="submit"
        disabled={isPending}
        className={`ml-auto space-x-4 text-white ${formType === "add" ? "bg-blue-500 hover:bg-blue-400" : "bg-yellow-500 hover:bg-yellow-400"}`}
      >
        {isPending && <LoaderCircleIcon size={16} className="animate-spin" />}
        {formType === "add" ? "Add new Link" : "Edit Link"}
      </Button>
    </form>
  );
}
