import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for session cart cookie
  if (!request.cookies.get("sessionCartId")) {
    // Generate new session cart id cookie
    const sessionCartId = crypto.randomUUID();

    // clone request headers
    const headers = new Headers(request.headers);

    const response = NextResponse.next({ headers });
    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  }

  return NextResponse.next();
}
