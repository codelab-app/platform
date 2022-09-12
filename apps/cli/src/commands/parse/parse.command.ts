import inquirer from 'inquirer'
import { CommandModule } from 'yargs'
import { antdAtomsFactory } from '../../data/atom'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { __seedAtomData } from '../import/import-seed-data'

export const parseCommand: CommandModule<any, any> = {
  command: 'parse',
  describe: 'Parse Ant Design scraped files to Interface model',
  handler: async () => {
    const { selectedUser } = await inquirer.prompt([await selectUserPrompt()])

    await __seedAtomData(selectedUser, antdAtomsFactory)
  },
}
