import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileImageUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getServerSession(authOptions);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        name: user.user?.name,
        email: user.user?.email,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for user:", metadata.name);
      console.log("file url", file.url);

      await prisma.user.update({
        where: {
          email: metadata.email!,
        },
        data: {
          image: file.url,
        },
      });

      await prisma.$disconnect();

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.email };
    }),
} satisfies FileRouter;

export type UploadFileRouter = typeof uploadFileRouter;
