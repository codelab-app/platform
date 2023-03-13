/**
 * This is the script environment for running processes like CI/CD
 */
export enum Stage {
  // Remote on CircleCi
  CI = 'ci',

  // Local using primary port
  Dev = 'dev',

  // Vercel remote
  Prod = 'prod',

  // Local using secondary port
  Test = 'test',
}
