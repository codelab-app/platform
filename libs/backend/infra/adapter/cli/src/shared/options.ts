import type { Options } from 'yargs'
import { Stage } from './utils/stage'

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
