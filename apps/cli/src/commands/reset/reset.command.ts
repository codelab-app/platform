import { CommandModule } from 'yargs'
import { resetDatabase } from '../../repository/admin.repo'

export const resetCommand: CommandModule<unknown, unknown> = {
  command: 'reset',
  describe: 'Reset database',
  handler: async () => {
    await resetDatabase()
  },
}
