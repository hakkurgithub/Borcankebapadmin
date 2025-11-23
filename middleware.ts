import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Token varsa geçiş izni ver
    },
    pages: {
      signIn: "/login", // Giriş yapılmamışsa buraya at
    },
  }
);

// Sadece bu yolları koru
export const config = {
  matcher: [
    "/manager/:path*",
    "/dashboard/:path*"
  ],
};