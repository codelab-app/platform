import { UserOGM } from '@codelab/backend/adapter/neo4j'
import { createSeedTypesData, createTagSeedData } from '@codelab/shared/data'
import inquirer from 'inquirer'
import { CommandModule } from 'yargs'
import { getEnvOptions } from '../../shared/command'
import { assignUserOption, upsertUserMiddleware } from '../../shared/path-args'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Env } from '../../shared/utils/env'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTags } from '../../use-cases/import/import-tags'
import { importTypes } from '../../use-cases/import/import-types'
import { createAntDesignAtomsData } from '../../use-cases/seed/data/ant-design.data'
import { parseAndImportInterface } from './parse-and-import-interface'

interface ParseProps {
  email?: string
}

export const seedCommand: CommandModule<ParseProps, ParseProps> = {
  command: 'seed',
  builder: (argv) =>
    argv
      .options({
        ...getEnvOptions([Env.Dev, Env.Test]),
        ...assignUserOption,
      })
      .middleware(upsertUserMiddleware),
  describe:
    'Parse Ant Design scraped CSV files and seed to application as types',
  handler: async ({ email }) => {
    const User = await UserOGM()

    const selectedUserId = email
      ? (await User.find({ where: { email } }))[0]?.id
      : (await inquirer.prompt([await selectUserPrompt()])).selectedUserId

    if (!selectedUserId) {
      throw new Error('User not found!')
    }

    /**
     * (1) First all our base types first
     */
    await importTypes(createSeedTypesData(), selectedUserId, (type) => ({
      name: type.name,
    }))

    /**
     * (2) Import tag tree
     */
    await importTags(createTagSeedData(), selectedUserId)

    // cLog(await createAntDesignAtomsData())

    /**
     * (3) Then import all atoms, and assign tags
     */
    await importAtoms({
      atoms: await createAntDesignAtomsData(),
      userId: selectedUserId,
      atomWhere: (atom) => ({
        name: atom.name,
      }),
      tagWhere: (tag) => ({
        name: tag.name,
      }),
    })

    /**
     * (4) Assign allowedChildren
     */

    /**
     * (5) Then parse and import the Ant Design interfaces
     */
    await parseAndImportInterface(selectedUserId)

    return process.exit(0)
  },
}
