import dotenv from 'dotenv'
import { MiddlewareFunction, Options } from 'yargs'
import { Stage } from './utils/stage'

type GetEnvOptions = (environments: Array<Stage>) => {
  stage: Options
}

/**
 * Options used locally
 */
export const getStageOptions: GetEnvOptions = (stages) => ({
  stage: {
    type: 'string',
    choices: stages,
    describe: 'Stage used to load proper `.env`',
    demandOption: true,
    default: Stage.Dev,
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
    dotenv.config({ path: '.env.prod', override: true })
  }

  if (stage === Stage.Dev) {
    dotenv.config({ path: '.env', override: true })
  }

  if (stage === Stage.Test) {
    dotenv.config({ path: '.env.test', override: true })
  }
}
