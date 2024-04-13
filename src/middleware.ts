import authConfig from "./lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
import {
  authRoutes,
  dashboardRoutes,
  apiAuthRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./lib/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("req.auth", req.auth);
  console.log("isAuthRoute", isAuthRoute);
  console.log("nextUrl.pathname", nextUrl.pathname);
  console.log("isLoggedIn", isLoggedIn);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // finally check dahsboard routes now
  if (!isLoggedIn) {
    for (let i = 0; i < dashboardRoutes.length; i++) {
      console.log(
        "nextUrl.pathname.startsWith(dashboardRoutes[i]!)",
        nextUrl.pathname.startsWith(dashboardRoutes[i]!)
      );
      if (
        dashboardRoutes[i] &&
        nextUrl.pathname.startsWith(dashboardRoutes[i]!)
      ) {
        return Response.redirect(new URL("/sign-in", nextUrl));
      }
    }
  }

  return null;
});

/**
 * Optionally, don't invoke Middleware on some paths
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
