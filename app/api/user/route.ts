import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // check if user authenticated
  if (!session) {
    return NextResponse.json(
      {
        error: "Signin required",
      },
      { status: 400 },
    );
  }

  // TODO: after making page theme feature, add it to here as well
  const getUserInfo = await prisma.user.findFirst({
    where: {
      email: session.user?.email!,
    },
    select: {
      name: true,
      image: true,
      page: {
        select: {
          username: true,
        },
      },
    },
  });

  return NextResponse.json(
    {
      data: {
        name: getUserInfo?.name,
        image: getUserInfo?.image,
        username: getUserInfo?.page?.username ?? null,
      },
    },
    { status: 200 },
  );
}
