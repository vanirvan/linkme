import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

type Link = {
  links: {
    id: number;
    title: string;
    link: string;
    order: number;
    createdAt: string;
  }[];
};

export async function POST(req: NextRequest) {
  const links: Link = await req.json();
  const linkIdLists = links.links.map((l) => l.id);

  try {
    await prisma.$transaction(async (tx) => {
      // set order to temporary offset, can't use null because order is NOT NULL
      const temporaryOffset = 1_000_000;
      for (let i = 0; i < linkIdLists.length; i++) {
        const lid = linkIdLists[i];
        await tx.linkOrder.update({
          where: {
            linkId: lid,
          },
          data: {
            order: {
              increment: temporaryOffset,
            },
          },
        });
      }

      // set correct order value
      for (let i = 0; i < linkIdLists.length; i++) {
        const lid = linkIdLists[i];
        await tx.linkOrder.update({
          where: {
            linkId: lid,
          },
          data: {
            order: i + 1,
          },
        });
      }
    });

    return NextResponse.json(
      { message: "Order changed, please refetch [GET] /api/links again" },
      { status: 200 },
    );
  } catch (e) {
    console.error("CHANGE ORDER ERROR");
    console.error("ERROR when accessing /api/links/order");
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
