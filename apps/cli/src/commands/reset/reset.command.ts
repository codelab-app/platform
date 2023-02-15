import { AdminService } from '@codelab/backend/domain/admin'
import type { CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import { Stage } from '../../shared/utils/stage'

export const resetCommand: CommandModule<unknown, unknown> = {
  command: 'reset',
  describe: 'Reset database',
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
  handler: async () => {
    return await new AdminService().reset({ close: true })
  },
}
