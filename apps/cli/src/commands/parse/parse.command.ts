import { createSeedTypesData } from '@codelab/shared/data'
import inquirer from 'inquirer'
import { CommandModule } from 'yargs'
import { antdAtomsFactory } from '../../data/atom'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTypes } from '../../use-cases/import/import-types'
import { createAntDesignAtomsData } from '../../use-cases/parser/ant-design'
import { parseAndImportInterface } from './parse-and-import-interface'

export const parseCommand: CommandModule<any, any> = {
  command: 'parse',
  describe:
    'Parse Ant Design scraped CSV files and insert to application as types',
  handler: async () => {
    const { selectedUser } = await inquirer.prompt([await selectUserPrompt()])

    /**
     * (1) First all our base types first
     */
    await importTypes(createSeedTypesData(), selectedUser, (type) => ({
      name: type.name,
    }))

    /**
     * (2) Then import all atoms
     */
    await importAtoms(
      antdAtomsFactory(await createAntDesignAtomsData()),
      selectedUser,
      (atom) => ({
        name: atom.name,
      }),
    )

    /**
     * (3) Then parse and import the Ant Design interfaces
     */
    await parseAndImportInterface(selectedUser)

    return process.exit(0)
  },
}
