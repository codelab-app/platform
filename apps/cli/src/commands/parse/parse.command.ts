import inquirer from 'inquirer'
import { CommandModule } from 'yargs'
import { antdAtomsFactory } from '../../data/atom'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { parseCsvData } from './parse-csv-data'

export const parseCommand: CommandModule<any, any> = {
  command: 'parse',
  describe:
    'Parse Ant Design scraped CSV files and insert to application as types',
  handler: async () => {
    const { selectedUser } = await inquirer.prompt([await selectUserPrompt()])

    await parseCsvData(selectedUser, antdAtomsFactory)

    return process.exit(0)
  },
}
