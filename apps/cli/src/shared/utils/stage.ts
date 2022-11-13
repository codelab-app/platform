/**
 * This is the script environment for running processes like CI/CD
 */
export enum Stage {
  // Local using primary port
  Dev = 'dev',

  // Local using secondary port
  Test = 'test',

  // Remote on CircleCi
  CI = 'ci',

  // Vercel remote
  Prod = 'prod',
}
