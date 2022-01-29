import { Options } from 'yargs'

export const ENV_FLAG = 'env'

export enum Env {
  Dev = 'dev',
  Test = 'test',
  Ci = 'ci',
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
