"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useIsClient } from "usehooks-ts";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  ChartNoAxesColumnIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { SigninButton } from "@/components/SigninButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUserInfo } from "@/lib/services";
import { shortName } from "@/lib/utils/shortName";

export function NavbarDropdownMenu() {
  const isClient = useIsClient();

  const { status: authStatus } = useSession();

  const {
    data: userInfoData,
    isPending: userInfoPending,
    refetch: refetchUserInfo,
  } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: getUserInfo,
    staleTime: Infinity,
    enabled: authStatus === "authenticated" ? true : false,
  });

  useEffect(() => {
    if (authStatus === "authenticated") {
      refetchUserInfo();
    }
  }, [authStatus, refetchUserInfo]);

  return !isClient || authStatus === "loading" ? null : authStatus ===
    "unauthenticated" ? (
    <SigninButton />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <p className="hidden text-sm md:block">{userInfoData?.data.name}</p>
          <Avatar className="h-8 w-8 border">
            <AvatarImage
              src={userInfoData?.data.image}
              alt={!userInfoPending ? shortName(userInfoData?.data.name) : ""}
              className="object-cover"
            />
            <AvatarFallback>
              {!userInfoPending ? shortName(userInfoData?.data.name) : ""}
            </AvatarFallback>
          </Avatar>
          <MenuIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background-500">
        <Link href={"/dashboard"}>
          <DropdownMenuItem className="cursor-pointer space-x-4">
            <LayoutDashboardIcon className="h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </Link>
        <Link href={"/analytic"}>
          <DropdownMenuItem className="cursor-pointer space-x-4">
            <ChartNoAxesColumnIcon className="h-4 w-4" />
            <span>Analytic</span>
          </DropdownMenuItem>
        </Link>
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
  );
}
