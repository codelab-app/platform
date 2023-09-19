import { Stage } from '@codelab/shared/abstract/core'
import type { Options } from 'yargs'

type GetStageOptions = (stages: Array<Stage>) => {
  stage: Options
}

/**
 * Options used locally
 */
export const getStageOptions: GetStageOptions = (stages) => ({
  stage: {
    choices: stages,
    default: Stage.Dev,
    demandOption: true,
    describe: 'Stage used to load proper `.env`',
    type: 'string',
  },
})
