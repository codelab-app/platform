import dotenv from 'dotenv'
import { MiddlewareFunction, Options } from 'yargs'
import { Env } from './utils/env'

type GetEnvOptions = (environments: Array<Env>) => {
  env: Options
}

export interface EnvOption {
  env: Env
}

/**
 * Options used locally
 */
export const getEnvOptions: GetEnvOptions = (environments) => ({
  env: {
    type: 'string',
    choices: environments,
    describe: 'Used to load proper `.env`',
    demandOption: true,
  },
})

export const setEnvMiddleware: MiddlewareFunction<{ env: unknown }> = ({
  env,
}) => {
  if (process.env.CI) {
    return
  }

  // Load prod env only if not CI
  if (env === Env.Prod) {
    dotenv.config({ path: '.env.prod', override: true })
  }

  if (env === Env.Dev) {
    dotenv.config({ path: '.env', override: true })
  }

  if (env === Env.Test) {
    dotenv.config({ path: '.env.test', override: true })
  }
}
