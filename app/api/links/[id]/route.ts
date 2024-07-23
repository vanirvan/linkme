import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteParam {
  params: {
    id: string;
  };
}

interface PATCHRequest {
  id: number;
  title: string;
  link: string;
}

export async function PATCH(req: NextRequest, { params }: RouteParam) {
  const { id, title, link }: PATCHRequest = await req.json();
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
    const findUser = await prisma.user.findFirst({
      where: {
        email: session?.user?.email!,
      },
      select: {
        id: true,
      },
    });

    const findLink = await prisma.link.findFirst({
      where: {
        id: +params.id,
        userId: findUser?.id,
      },
    });

    if (!findLink) {
      return NextResponse.json(
        {
          error: "Link not found",
        },
        { status: 400 },
      );
    }

    const updateLink = await prisma.link.update({
      where: {
        id: +params.id,
      },
      data: {
        title,
        link,
      },
    });

    return NextResponse.json({ data: updateLink }, { status: 200 });
  } catch (e) {
    console.error("UPDATE LINKS ERROR");
    console.error(`ERROR when accessing /api/links/${id}`);
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

export async function DELETE(req: NextRequest, { params }: RouteParam) {
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
    const findUser = await prisma.user.findFirst({
      where: {
        email: session?.user?.email!,
      },
      select: {
        id: true,
      },
    });

    const findLink = await prisma.link.findFirst({
      where: {
        id: +params.id,
        userId: findUser?.id,
      },
    });

    if (!findLink) {
      return NextResponse.json(
        {
          error: "Link not found",
        },
        { status: 400 },
      );
    }

    await prisma.link.delete({
      where: {
        id: +params.id,
      },
    });

    return NextResponse.json(
      {
        data: "link deleted",
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("DELETE LINK ERROR");
    console.error(`ERROR when accessing /api/links/${params.id}`);
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
