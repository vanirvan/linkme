"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function SigninButton() {
  const onSignin = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      variant={"link"}
      size={"sm"}
      onClick={onSignin}
      className="group relative bg-primary-500 outline-none transition-colors duration-200 hover:bg-primary-300 hover:no-underline"
    >
      <span>Signin</span>
    </Button>
  );
}
