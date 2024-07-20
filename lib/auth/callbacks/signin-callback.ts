import { prisma } from "@/lib/db/prisma";
import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface CallbackProps {
  user: User | AdapterUser;
  account: Account | null;
}

export async function signinCallback({ user, account }: CallbackProps) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: user.email!,
      },
    });

    if (findUser) return true;

    const createUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email!,
        image: user.image,
      },
    });

    const createAccount = await prisma.account.create({
      data: {
        userId: createUser.id,
        provider: account?.provider!,
        providerAccountId: account?.providerAccountId!,
      },
    });

    return true;
  } catch (e) {
    console.error("=== SIGNIN ERROR ===");
    console.error(e);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
