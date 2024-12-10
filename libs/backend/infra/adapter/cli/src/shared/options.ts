import type { Options } from 'yargs'

import { Stage } from '@codelab/shared/abstract/core'

/**
 * Options used locally
 */
export const getStageOptions = (
  stages: Array<Stage>,
): {
  stage: Options
} => ({
  stage: {
    choices: stages,
    default: Stage.Dev,
    demandOption: true,
    describe: 'Stage used to load proper `.env`',
    type: 'string',
  },
})

export interface StageParam {
  stage: Stage
}

export const getAutoApproveOptions = (): { autoApprove: Options } => ({
  autoApprove: {
    default: false,
    type: 'boolean',
  },
})
