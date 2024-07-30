import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const { linkClaim }: { linkClaim: string } = await req.json();

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

  // check if user already have page
  const findUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      id: true,
      page: {
        select: {
          username: true,
        },
      },
    },
  });

  if (findUser?.page?.username) {
    return NextResponse.json(
      {
        error: {
          link: "User already have page.",
        },
      },
      { status: 400 },
    );
  }

  // validate
  const validateSchema = z
    .string()
    .min(6, { message: "Minimum link length is 6 characters" })
    .max(16, { message: "Maximum link length is 16 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Link can only contain alphanumeric" })
    .refine(
      async (claimLink) => {
        const checkUsername = await prisma.page.findUnique({
          where: {
            username: claimLink,
          },
        });

        return checkUsername == null ? true : false;
      },
      { message: "Link already exist, try another one." },
    );

  const validate = await validateSchema.safeParseAsync(linkClaim);

  if (!validate.success) {
    const validateError = validate.error.flatten().formErrors;
    return NextResponse.json(
      { error: { link: validateError } },
      { status: 400 },
    );
  }

  try {
    const createNewUsername = await prisma.page.create({
      data: {
        userId: findUser?.id!,
        username: validate.data,
      },
    });

    return NextResponse.json(
      { data: { link: createNewUsername.username } },
      { status: 200 },
    );
  } catch (e) {
    console.error("ERROR HAPPENED AT [POST] /API/LINKS/CLAIM");
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
