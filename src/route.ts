/**
 * An array containing all public routes that do not require authentication.
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/', '/auth/new-verification'];

/**
 * An array consisting of all routes that require user authentication.
 * @type {string[]}
 * @description These routes require proper user authentication before access is granted.
 */
export const authRoutes: string[] = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/forgot-password',
  '/auth/new-password',
];

/**
 * The prefix for API authentication routes.
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect route after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';
