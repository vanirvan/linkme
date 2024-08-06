import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } },
) {
  const getUsername = await prisma.page.findUnique({
    where: { username: params.username },
    select: {
      userId: true,
    },
  });

  if (!getUsername) {
    return NextResponse.json(
      {
        message: "Link not found",
        data: null,
      },
      { status: 404 },
    );
  }

  const getUserData = await prisma.user.findUnique({
    where: {
      id: getUsername.userId,
    },
    select: {
      name: true,
      page: {
        select: {
          username: true,
        },
      },
      image: true,
      links: {
        orderBy: {
          linkOrders: {
            order: "asc",
          },
        },
      },
    },
  });

  return NextResponse.json(
    {
      message: `${getUserData?.name}'s page`,
      data: {
        name: getUserData?.name,
        username: getUserData?.page?.username,
        image: getUserData?.image,
        links: getUserData?.links,
      },
    },
    { status: 200 },
  );
}
