import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = cookies();
  const authSession = cookie.get("next-auth.session-token");

  if (!authSession) {
    return NextResponse.redirect(req.nextUrl.origin + "/");
  }
}

export const config = { matcher: ["/account", "/dashboard", "/analytic"] };
