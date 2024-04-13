/**
 * an array of routes that are NOT accessible to the public
 * @type {string[]}
 */
export const dashboardRoutes = ["/dashboard", "/admin"];

/**
 * routes used for authentication
 * These routes will redirect logged-in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ["/sign-in", "/sign-up"];

/**
 * the prefix for API auth routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthRoutes = "/api/auth/";

/**
 * The default redirect path after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/admin";
