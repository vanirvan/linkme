import { CallbacksOptions } from "next-auth";
import { signinCallback } from "./callbacks/signin-callback";

export const cbo = {
  async signIn({ user, account, profile, email, credentials }) {
    const signInProcess = await signinCallback({ user, account });
    return signInProcess;
  },
  async redirect({ url, baseUrl }) {
    // Allows relative callback URLs
    if (url.startsWith("/")) return `${baseUrl}${url}`;
    // Allows callback URLs on the same origin
    else if (new URL(url).origin === baseUrl) return url;
    return baseUrl;
  },
  async session({ session, user, token }) {
    return session;
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    return token;
  },
} satisfies CallbacksOptions;
