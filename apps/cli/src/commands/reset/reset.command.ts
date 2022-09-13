import { CommandModule } from 'yargs'
import { resetDatabase } from '../../repository/admin.repo'

export const resetCommand: CommandModule<any, any> = {
  command: 'reset',
  describe: 'Reset database',
  // builder: argv =>
  handler: async () => {
    await resetDatabase()
  },
}
