"use client";

import { PencilIcon, LoaderCircleIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shortName } from "@/lib/utils/shortName";
import { useEffect, useState } from "react";
import { useUploadThing as useUpload } from "@/lib/utils/uploadthing";

interface ComponentProps {
  image: string;
  username: string;
  name: string;
}

export function AccountInfoPage({ image, username, name }: ComponentProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { startUpload, isUploading } = useUpload("profileImageUpload", {
    onClientUploadComplete: (res) => {
      setUploadedFile(null);
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
          <AvatarImage src={image} alt={username} />
          <AvatarFallback>{shortName(name)}</AvatarFallback>
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
      <p>{name}</p>
    </div>
  );
}
