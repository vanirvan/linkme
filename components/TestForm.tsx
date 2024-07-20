"use client";

import { postLink } from "@/lib/services/postLink";
import { useState } from "react";

export function TestForm() {
  type FormState = {
    url: string;
    title: string;
  };

  const [form, setForm] = useState<FormState>({ url: "", title: "" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pl = await postLink({ url: form.url, title: form.title });
    console.log(pl);
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-96 flex-col gap-2 p-4">
      <input
        type="text"
        name="title"
        placeholder="title"
        value={form.title}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, title: e.target.value }))
        }
        required
        className="text-black"
      />
      <input
        type="url"
        name="url"
        placeholder="url"
        value={form.url}
        onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
        required
        className="text-black"
      />
      <button type="submit">submit</button>
    </form>
  );
}
