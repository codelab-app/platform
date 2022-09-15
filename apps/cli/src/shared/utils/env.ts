/**
 * This is the script environment for running processes like CI/CD
 */
export enum Env {
  // Local using primary port
  Dev = 'dev',

  // Local using secondary port
  Test = 'test',

  // Remote on CircleCi
  CI = 'ci',
}

/**
 * This is the deployment environment.
 */
export enum Stage {
  // Vercel remote
  Prod = 'prod',

  // // Vercel remote
  // Staging = 'staging',

  // // Local test flow, exists in memory only
  // Test = 'test',

  // Local
  Dev = 'dev',
}
