"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";
import { claimLink as claimLinkFn } from "@/lib/services/claimLink";
import { Loader2Icon } from "lucide-react";

export function ClaimAccontPage() {
  const searchParams = useSearchParams();
  const claimLink = searchParams.get("claim");

  const [linkForm, setLinkForm] = useState<string>("");
  const [linkError, setLinkError] = useState<string[]>([]);

  const { mutate, isPending, data } = useMutation({
    mutationFn: claimLinkFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userPage"] });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(linkForm);
  };

  useEffect(() => {
    if (claimLink) {
      setLinkForm(claimLink);
    }
  }, [claimLink]);

  useEffect(() => {
    const localClaimLink = localStorage.getItem("username");
    if (localClaimLink) setLinkForm(localClaimLink);
  }, []);

  useEffect(() => {
    if (data?.error) {
      setLinkError(data?.error?.link);
    }

    if (data?.data) {
      localStorage.removeItem("username");
    }
  }, [data]);

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <h1 className="text-3xl font-semibold leading-none tracking-tight">
        You don&apos;t have a page yet!
      </h1>
      <h2 className="text-sm text-neutral-500 dark:text-neutral-400">
        Let&apos;s create one before you continue!
      </h2>
      <div className="relative w-max rounded border border-[#CBD5E1] bg-[#F1F5F9] p-4">
        <span className="text-[#333333]">link.me/</span>
        <input
          type="text"
          name="link"
          placeholder="yourlink"
          value={linkForm}
          onChange={(e) => setLinkForm(e.target.value)}
          disabled={isPending}
          className="max-w-96 bg-transparent text-[#333333] placeholder:text-[#8B8B8B] focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        {linkError.map((le, key) => {
          return (
            <p key={key} className="text-xs italic text-red-500">
              {le}
            </p>
          );
        })}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="flex w-max items-center gap-2 rounded-full bg-primary-500 text-black hover:bg-primary-300"
      >
        Claim your link
        {isPending ? <Loader2Icon size={16} className="animate-spin" /> : null}
      </Button>
    </form>
  );
}
