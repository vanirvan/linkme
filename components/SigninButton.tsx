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

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";
// import {
//   UserIcon,
//   LogOutIcon,
//   MenuIcon,
//   LayoutDashboardIcon,
// } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { shortName } from "@/lib/utils/shortName";
// import { useIsClient } from "@/lib/utils/isClient";
// import { getUserPage } from "@/lib/services/getUserPage";
// import { useUserInfoStore } from "@/lib/store/useUserInfoStore";

// export function SigninButton() {
//   const isClient = useIsClient();

//   const { data: session, status } = useSession();

//   const {
//     data: userPageData,
//     refetch,
//     isFetching,
//   } = useQuery({
//     queryKey: ["userPageInfo"],
//     queryFn: getUserPage,
//     staleTime: Infinity,
//     enabled: status === "authenticated" ? true : false,
//   });

//   const [userName, userImage, update] = useUserInfoStore((state) => [
//     state.name,
//     state.image,
//     state.update,
//   ]);

//   useEffect(() => {
//     if (status === "authenticated") {
//       refetch();
//     }
//   }, [status, refetch]);

//   useEffect(() => {
//     if (!isFetching && userPageData) {
//       update({
//         name: userPageData.data.name!,
//         image: userPageData.data.image!,
//         username: userPageData.data.username!,
//       });
//     }
//   }, [userPageData, update, isFetching]);

//   const onSignin = () => {
//     signIn("google", { callbackUrl: "/dashboard" });
//   };

//   return !isClient || session === undefined ? null : session !== null ? (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="flex cursor-pointer items-center gap-2">
//           <p className="text-sm">{session?.user?.name}</p>
//           <Avatar className="h-8 w-8 border">
//             <AvatarImage
//               src={userImage}
//               alt={shortName(userName)}
//               className="object-cover"
//             />
//             <AvatarFallback>{shortName(userName)}</AvatarFallback>
//           </Avatar>
//           <MenuIcon size={16} />
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="bg-background-500">
//         <Link href={"/dashboard"}>
//           <DropdownMenuItem className="cursor-pointer space-x-4">
//             <LayoutDashboardIcon className="h-4 w-4" />
//             <span>Dashboard</span>
//           </DropdownMenuItem>
//         </Link>
//         <Link href={"/account"}>
//           <DropdownMenuItem className="cursor-pointer space-x-4">
//             <UserIcon className="h-4 w-4" />
//             <span>Account</span>
//           </DropdownMenuItem>
//         </Link>
//         <DropdownMenuItem
//           onClick={() => signOut({ callbackUrl: "/" })}
//           className="cursor-pointer space-x-4"
//         >
//           <LogOutIcon className="h-4 w-4" />
//           <span>Logout</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   ) : (
//     <Button
//       variant={"link"}
//       size={"sm"}
//       onClick={onSignin}
//       className="group relative bg-primary-500 outline-none transition-colors duration-200 hover:bg-primary-300 hover:no-underline"
//     >
//       <span>Signin</span>
//     </Button>
//   );
// }
