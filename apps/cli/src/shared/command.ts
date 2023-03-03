import dotenv from 'dotenv'
import type { MiddlewareFunction, Options } from 'yargs'
import { Stage } from './utils/stage'

type GetEnvOptions = (environments: Array<Stage>) => {
  stage: Options
}

/**
 * Options used locally
 */
export const getStageOptions: GetEnvOptions = (stages) => ({
  stage: {
    choices: stages,
    default: Stage.Dev,
    demandOption: true,
    describe: 'Stage used to load proper `.env`',
    type: 'string',
  },
})

/**
 * Used locally to load env for other stages
 */
export const loadStageMiddleware: MiddlewareFunction<{
  stage: unknown
}> = async ({ stage }) => {
  if (process.env.CI) {
    return
  }

  // Load prod env only if not CI
  if (stage === Stage.Prod) {
    dotenv.config({ override: true, path: '.env.prod' })
  }

  if (stage === Stage.Dev) {
    dotenv.config({ override: true, path: '.env' })
  }

  if (stage === Stage.Test) {
    dotenv.config({ override: true, path: '.env.test' })
  }
}
