import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

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

export async function PATCH(req: NextRequest) {
  const { name, username } = await req.json();

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

  // validate
  const validateSchema = z.object({
    name: z.string().min(4).max(64),
    username: z
      .string()
      .min(6, { message: "Minimum username length is 6 characters" })
      .max(16, { message: "Maximum username length is 16 characters" })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain alphanumeric",
      }),
  });

  const validate = validateSchema.safeParse({ name, username });

  if (!validate.success) {
    const validateError = validate.error.flatten().fieldErrors;
    return NextResponse.json({ error: validateError }, { status: 400 });
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: session?.user?.email!,
      },
      include: {
        page: {
          select: {
            username: true,
          },
        },
      },
    });

    if (findUser?.name !== name) {
      await prisma.user.update({
        where: {
          id: findUser?.id,
        },
        data: {
          name,
        },
      });
    }

    if (findUser?.page?.username !== username) {
      const checkUniqueUsername = await prisma.page.findUnique({
        where: {
          username,
        },
      });

      if (checkUniqueUsername) {
        return NextResponse.json(
          {
            error: {
              username: ["Username already exist, try another one."],
            },
          },
          { status: 400 },
        );
      }

      await prisma.page.update({
        where: {
          username: findUser?.page?.username,
        },
        data: {
          username,
        },
      });
    }

    return NextResponse.json(
      {
        data: {
          name,
          image: findUser?.image,
          username,
        },
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("ERROR HAPPENED AT [POST] /API/USER");
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(req: NextRequest) {
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
    await prisma.user.delete({
      where: {
        email: session?.user?.email!,
      },
    });

    return NextResponse.json(
      {
        message: "User deleted, Sayonara!",
        data: null,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error("ERROR HAPPENED AT [DELETE] /API/USER");
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
