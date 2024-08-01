"use client";

import { useEffect, useState } from "react";
import { PencilIcon, LoaderCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { queryClient } from "@/components/providers/QueryProvider";
import { shortName } from "@/lib/utils/shortName";
import { useUploadThing as useUpload } from "@/lib/utils/uploadthing";
import { useUserInfoStore } from "@/lib/store/useUserInfoStore";
import { deleteProfileImage } from "@/lib/services/deleteProfilePhoto";

export function AccountInfoPage() {
  const [userName, userImage, userUsername] = useUserInfoStore((state) => [
    state.name,
    state.image,
    state.username,
  ]);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { startUpload, isUploading } = useUpload("profileImageUpload", {
    onClientUploadComplete: async (res) => {
      setUploadedFile(null);
      await deleteProfileImage(userImage);
      queryClient.invalidateQueries({ queryKey: ["userPageInfo"] });
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

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="relative">
        <Avatar className="h-32 w-32 border shadow">
          <AvatarImage
            src={userImage}
            alt={userUsername}
            className="object-cover"
          />
          <AvatarFallback>{shortName(userName)}</AvatarFallback>
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
      <p>{userName}</p>
    </div>
  );
}
