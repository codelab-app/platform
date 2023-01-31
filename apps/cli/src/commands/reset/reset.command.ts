import { resetDatabase } from '@codelab/backend/domain/admin'
import type { CommandModule } from 'yargs'

export const resetCommand: CommandModule<unknown, unknown> = {
  command: 'reset',
  describe: 'Reset database',
  handler: async () => {
    await resetDatabase()
  },
}
