import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(req.nextUrl.origin + "/");
  }
}

export const config = { matcher: ["/account", "/dashboard", "/analytic"] };
