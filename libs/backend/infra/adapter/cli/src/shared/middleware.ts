import type { MiddlewareFunction } from 'yargs'

import { Stage } from '@codelab/shared-abstract-core'
import { getEnv } from '@codelab/shared-config-env'
import dotenv from 'dotenv'

/**
 * Used locally to load env for other stages
 */
export const loadStageMiddleware: MiddlewareFunction = ({ stage }) => {
  if (getEnv().circleci.ci) {
    return
  }

  dotenv.config({ override: true, path: '.env' })

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
