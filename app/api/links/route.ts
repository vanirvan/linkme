import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

interface PostRequest {
  title: string;
  url: string;
}

export async function POST(req: NextRequest) {
  const { title, url }: PostRequest = await req.json();

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

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
      select: {
        id: true,
      },
    });

    // get last link
    const lastLinkOrder = await prisma.linkOrder.findFirst({
      where: {
        userId: findUser?.id,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    let currentOrder: number = 1;
    if (lastLinkOrder) currentOrder = lastLinkOrder.order + 1;

    const storeLink = await prisma.link.create({
      data: {
        userId: findUser?.id!,
        title,
        link: url,
      },
    });

    const storeLinkOrder = await prisma.linkOrder.create({
      data: {
        userId: findUser?.id!,
        linkId: storeLink.id,
        order: currentOrder,
      },
    });

    return NextResponse.json(
      {
        data: {
          id: storeLink.id,
          title: storeLink.title,
          link: storeLink.link,
          order: storeLinkOrder.order,
        },
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("ERROR POST LINK API");
    console.error(e);
    return NextResponse.json(
      {
        error: "Something went wrong on the server, please try again later.",
      },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
