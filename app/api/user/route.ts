import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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

  const getUserPage = await prisma.user.findFirst({
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
      links: {
        select: {
          id: true,
          title: true,
          link: true,
          linkOrders: {
            select: {
              order: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          id: "desc",
        },
      },
      _count: {
        select: {
          links: true,
        },
      },
    },
  });

  if (!getUserPage?.page?.username) {
    return NextResponse.json(
      {
        data: {
          name: getUserPage?.name,
          username: null,
          image: getUserPage?.image,
          links: getUserPage?.links,
          total_link: getUserPage?._count.links,
        },
      },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      {
        data: {
          name: getUserPage.name,
          username: getUserPage?.page?.username,
          image: getUserPage?.image,
          links: getUserPage?.links,
          total_link: getUserPage?._count.links,
        },
      },
      { status: 200 },
    );
  }
}
