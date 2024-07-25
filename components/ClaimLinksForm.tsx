"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ClaimLinksForm() {
  const router = useRouter();

  const { data: session } = useSession();

  const [linkClaim, setLinkClaim] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (session) {
      router.push("/account?claim=" + linkClaim);
    } else {
      window.localStorage.setItem("username", linkClaim);
      signIn("google");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-4 flex w-full max-w-96 flex-col gap-4"
    >
      <div className="relative w-max rounded border border-[#CBD5E1] bg-[#F1F5F9] p-4">
        <span className="text-[#333333]">link.me/</span>
        <input
          type="text"
          name="link"
          placeholder="yourlink"
          value={linkClaim}
          onChange={(e) => setLinkClaim(e.target.value)}
          className="max-w-96 bg-transparent text-[#333333] placeholder:text-[#8B8B8B] focus:outline-none"
        />
      </div>
      <Button
        type="submit"
        className="bg-primary-500 hover:bg-primary-300 w-max rounded-full text-black"
      >
        Claim your link
      </Button>
    </form>
  );
}
