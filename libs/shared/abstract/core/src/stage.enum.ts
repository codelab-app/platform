/**
 * This is the script environment for running processes like CI/CD
 */
export enum Stage {
  // Remote on CircleCi
  CI = 'ci',

  // Local using primary port
  Dev = 'dev',

  // DigitalOcean remote
  Prod = 'prod',

  // Kubernetes production environment
  ProdKube = 'prod-kube',

  // Runtime configuration for prod
  ProdRuntime = 'prod-runtime',

  // Local using secondary port
  Test = 'test',
}
