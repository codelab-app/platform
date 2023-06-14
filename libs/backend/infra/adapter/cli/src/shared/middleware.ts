import { getEnv } from '@codelab/shared/config'
import dotenv from 'dotenv'
import type { MiddlewareFunction } from 'yargs'
import { Stage } from './utils/stage'

/**
 * Used locally to load env for other stages
 */
export const loadStageMiddleware: MiddlewareFunction = ({ stage }) => {
  if (getEnv().circleci.ci) {
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
