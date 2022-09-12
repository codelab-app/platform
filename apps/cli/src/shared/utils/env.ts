import { Options } from 'yargs'

export const ENV_FLAG = 'env'

/**
 * This is the script environment for running processes like CI/CD
 */
export enum Env {
  // Local dev flow
  Dev = 'dev',

  // Local flow
  Test = 'test',

  // Remote
  CI = 'ci',
}

/**
 * This is the deployment environment.
 */
export enum Stage {
  // Vercel remote
  Prod = 'prod',

  // Vercel remote
  Staging = 'staging',

  // Local
  Dev = 'dev',
}

/**
 * Environment for running commands
 */
export const envOptions: Options = {
  type: 'string',
  choices: Object.values(Env),
  describe: 'Used to load proper `.env`',
}

export enum TaskEnv {
  Test = 'test',
  Ci = 'ci',
}

/**
 * Environment for running tests
 */
export const taskEnvOptions: Options = {
  type: 'string',
  choices: Object.values(TaskEnv),
  describe: 'Used to load proper `.env`',
}
