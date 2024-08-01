import { createRouteHandler } from "uploadthing/next";

import { uploadFileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: uploadFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export async function DELETE(req: NextRequest) {
  const { image }: { image: string } = await req.json();
  console.log("delete image id: " + image);

  const uploadThingBaseUrl = "https://utfs.io/f/";
  const separateImageId = image.split(uploadThingBaseUrl)[1];

  const utapi = new UTApi();
  await utapi.deleteFiles(separateImageId);

  return NextResponse.json({ message: "ok" }, { status: 200 });
}