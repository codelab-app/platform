import { AdminService } from '@codelab/backend/domain/admin'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import type { CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import { Stage } from '../../shared/utils/stage'

export const resetCommand: CommandModule<unknown, unknown> = {
  builder: (argv) =>
    argv
      .options({
        ...getStageOptions([
          Stage.Dev,
          Stage.Test,
          // Stage.Prod
        ]),
      })
      .middleware([loadStageMiddleware]),
  command: 'reset',
  describe: 'Reset database',
  handler: async () => {
    return await new AdminService(getDriver()).reset({ close: true })
  },
}
