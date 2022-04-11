/**
 * Auth0 post registration hook only works for database, social login can't assign a role.
 *
 * We don't set a role for regular users
 */
export enum Role {
  // Admin will be manually set in Auth0
  Admin = 'Admin',
  // User will be the default for authorized users, not set inside Auth0
  User = 'User',
  // Guest will be the default for unauthorized users
  Guest = 'Guest',
}
