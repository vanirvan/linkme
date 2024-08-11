"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon, PencilIcon, SaveIcon, XIcon } from "lucide-react";
import { useMediaQuery, useIsClient } from "usehooks-ts";
import { signOut } from "next-auth/react";

import { queryClient } from "@/components/providers/QueryProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  getUserInfo,
  updateUserInfo,
  deleteProfileImage,
  deleteUser,
} from "@/lib/services/";
import { useUploadThing as useUpload } from "@/lib/utils/uploadthing";
import { shortName } from "@/lib/utils/shortName";

export function AccountSettingForm() {
  const isClient = useIsClient();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [input, setInput] = useState<{ name: string; username: string }>({
    name: "",
    username: "",
  });

  const [inputError, setInputError] = useState<{
    name: string[];
    username: string[];
  }>({
    name: [],
    username: [],
  });

  const { data: userInfoData, isPending } = useQuery({
    queryKey: ["UserInfo"],
    queryFn: getUserInfo,
    staleTime: Infinity,
  });

  const {
    data: mutateUserInfoData,
    mutate: mutateUserInfo,
    isPending: isMutatePending,
  } = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserInfo"] });
    },
  });

  useEffect(() => {
    if (!isMutatePending && mutateUserInfoData?.error) {
      setInputError((prev) => ({
        ...prev,
        name: mutateUserInfoData.error?.name
          ? mutateUserInfoData.error?.name!
          : [],
        username: mutateUserInfoData.error?.username
          ? mutateUserInfoData.error?.username!
          : [],
      }));
    }
  }, [isMutatePending, mutateUserInfoData]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError({ name: [], username: [] });
    mutateUserInfo({
      name: input.name,
      username: input.username ? input.username : null,
    });
  };

  const onCancel = () => {
    setDeleteDialogOpen(false);
  };

  const onDelete = () => {
    mutateDeleteUser();
  };

  useEffect(() => {
    if (!isPending && userInfoData) {
      setInput((prev) => ({
        name: userInfoData.data.name,
        username: userInfoData.data.username,
      }));
    }
  }, [isPending, userInfoData]);

  // handle profile image change
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { startUpload, isUploading } = useUpload("profileImageUpload", {
    onClientUploadComplete: async (res) => {
      setUploadedFile(null);
      await deleteProfileImage(userInfoData?.data.image!);
      queryClient.invalidateQueries({ queryKey: ["UserInfo"] });
    },
    onUploadError: () => {},
    onUploadBegin: () => {},
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadedFile(e.target.files?.[0] as File);
  };

  useEffect(() => {
    if (uploadedFile) {
      startUpload([uploadedFile]);
    }
  }, [uploadedFile, startUpload]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const { mutate: mutateDeleteUser, isPending: isDeleteUserPending } =
    useMutation({
      mutationFn: deleteUser,
      onSuccess: () => {
        setDeleteDialogOpen(false);
        signOut({ callbackUrl: "/" });
      },
    });

  return isClient && userInfoData ? (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="relative w-max">
          <label className="mb-2 text-sm font-medium leading-none">
            Profile Image
          </label>
          <Avatar className="h-32 w-32 border shadow">
            <AvatarImage
              src={userInfoData ? userInfoData.data.image : ""}
              alt={userInfoData ? userInfoData.data.name : ""}
            />
            <AvatarFallback>
              {userInfoData ? shortName(userInfoData.data.name) : ""}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-neutral-200 bg-white text-sm font-medium ring-offset-white transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <label
              htmlFor="editProfilePicture"
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <LoaderCircleIcon size={16} className="animate-spin" />
              ) : (
                <PencilIcon size={16} />
              )}
            </label>
            <input
              id="editProfilePicture"
              hidden
              type="file"
              name="profilePhotoInput"
              accept="image/*"
              disabled={isUploading}
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Name
          </label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={input.name}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full max-w-sm"
          />
          {inputError.name.length > 0
            ? inputError.name.map((inputErrorName, key) => (
                <p key={key} className="text-xs text-red-500">
                  {inputErrorName}
                </p>
              ))
            : null}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-sm font-medium leading-none"
          >
            Username
          </label>
          <Input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={input.username}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, username: e.target.value }))
            }
            className="w-full max-w-sm"
          />
          {inputError.username.length > 0
            ? inputError.username.map((inputErrorUsername, key) => (
                <p key={key} className="text-xs text-red-500">
                  {inputErrorUsername}
                </p>
              ))
            : null}
        </div>

        <Button
          type="submit"
          className="flex w-max items-center gap-2 bg-blue-500 hover:bg-blue-400"
          disabled={isMutatePending}
        >
          <SaveIcon size={16} />
          Save
        </Button>
      </form>

      <Button
        variant={"destructive"}
        className="mt-20 flex w-max items-center gap-2"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <XIcon size={16} className="text-white" />
        Delete Account
      </Button>

      {isDesktop ? (
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-500">
                Confirm Deleting account
              </DialogTitle>
              <DialogDescription>
                You&lsquo;ll loose all links that you created
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={onCancel}
                className="bg-slate-500 hover:bg-slate-400"
              >
                Nevermind
              </Button>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={onDelete}
                className="space-x-4"
              >
                Yes, Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-red-500">
                Confirm Deleting account
              </DrawerTitle>
              <DrawerDescription>
                You&lsquo;ll loose all links that you created
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={onCancel}
                className="bg-slate-500 hover:bg-slate-400"
              >
                Nevermind
              </Button>
              <Button
                variant="destructive"
                disabled={isDeleteUserPending}
                onClick={onDelete}
                className="space-x-4"
              >
                {isDeleteUserPending && (
                  <LoaderCircleIcon size={16} className="animate-spin" />
                )}
                Yes, Delete Account
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  ) : (
    <LoadingSkeleton />
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-96" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-96" />
        </div>
        <Skeleton className="h-10 w-24 rounded" />
      </div>
      <Skeleton className="h-10 w-48" />
    </>
  );
}
