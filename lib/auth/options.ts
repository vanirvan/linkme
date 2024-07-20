import { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { cbo as callbacks } from "@/lib/auth/callbacks";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks,
} satisfies AuthOptions;
