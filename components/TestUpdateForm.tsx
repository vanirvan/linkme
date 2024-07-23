"use client";

import { postLink } from "@/lib/services/postLink";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "./providers/QueryProvider";
import { updateLink } from "@/lib/services/updateLink";

export function TestUpdateForm() {
  type TestUpdateForm = {
    id: number;
    title: string;
    link: string;
  };
  const [updateForm, setUpdateForm] = useState<TestUpdateForm>({
    id: 0,
    title: "",
    link: "",
  });

  const updateLinkMutate = useMutation({
    mutationFn: updateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateLinkMutate.mutate({
      id: updateForm.id,
      url: updateForm.link,
      title: updateForm.title,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="my-8 flex max-w-96 flex-col gap-2 px-4"
    >
      <h1>Manually update link</h1>
      <input
        type="number"
        name="id"
        placeholder="id"
        value={updateForm.id}
        onChange={(e) =>
          setUpdateForm((prev) => ({ ...prev, id: +e.target.value }))
        }
        required
        className="text-black"
      />
      <input
        type="text"
        name="title"
        placeholder="title"
        value={updateForm.title}
        onChange={(e) =>
          setUpdateForm((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        className="text-black"
      />
      <input
        type="url"
        name="url"
        placeholder="url"
        value={updateForm.link}
        onChange={(e) =>
          setUpdateForm((prev) => ({ ...prev, link: e.target.value }))
        }
        required
        className="text-black"
      />
      <button type="submit">Update ID</button>
    </form>
  );
}
