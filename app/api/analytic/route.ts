import { type NextRequest, NextResponse } from "next/server";
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

  const today = new Date();
  const dateFrom = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const findUserPageId = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!,
    },
    select: {
      page: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!findUserPageId?.page) {
    return NextResponse.json(
      {
        data: {
          visitors: [],
          total_visitor: 0,
        },
      },
      { status: 200 },
    );
  }

  const visitorCount = await prisma.visitor.count({
    where: {
      pageId: findUserPageId?.page?.id,
      createdAt: {
        gte: dateFrom,
        lte: today,
      },
    },
  });

  if (!findUserPageId?.page) {
    return NextResponse.json(
      {
        data: [],
      },
      { status: 200 },
    );
  }

  const getVisitorLists = await prisma.visitor.findMany({
    where: {
      pageId: findUserPageId.page.id,
    },
    select: {
      createdAt: true,
    },
  });

  type GroupedVisitor = { date: Date; visitor: number };

  const groupedVisitor: GroupedVisitor[] = [];

  getVisitorLists.forEach((getVisitorValue) => {
    const eachDate = getVisitorValue.createdAt.toISOString().split("T")[0];
    const groupedVisitorIndex = groupedVisitor.findIndex(
      (value) => value.date.toISOString() === new Date(eachDate).toISOString(),
    );

    if (groupedVisitorIndex > 0) {
      groupedVisitor[groupedVisitorIndex].visitor += 1;
    } else {
      groupedVisitor.push({ date: new Date(eachDate), visitor: 1 });
    }
  });

  groupedVisitor.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  return NextResponse.json(
    {
      data: {
        visitors: groupedVisitor,
        total_visitor: visitorCount,
      },
    },
    { status: 200 },
  );
}
