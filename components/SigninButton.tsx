"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { UserIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { shortName } from "@/lib/utils/shortName";
import Link from "next/link";

export function SigninButton() {
  const { data: session } = useSession();

  const onSignin = () => {
    signIn("google", { callbackUrl: "/account" });
  };

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <p className="text-sm">{session?.user?.name}</p>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image!}
              alt={shortName(session?.user?.name!)}
            />
            <AvatarFallback>{session?.user?.name}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background-500">
        <Link href={"/account"}>
          <DropdownMenuItem className="cursor-pointer space-x-4">
            <UserIcon className="h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="cursor-pointer space-x-4"
        >
          <LogOutIcon className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
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
