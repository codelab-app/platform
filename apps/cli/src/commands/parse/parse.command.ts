import { UserOGM } from '@codelab/backend/adapter/neo4j'
import { Role } from '@codelab/shared/abstract/codegen'
import { Config } from '@codelab/shared/config'
import { createTagSeedData } from '@codelab/shared/data'
import inquirer from 'inquirer'
import { v4 } from 'uuid'
import { CommandModule } from 'yargs'
import { upsertUser } from '../../repository/user.repo'
import { getEnvOptions } from '../../shared/command'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Env } from '../../shared/utils/env'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTags } from '../../use-cases/import/import-tags'
import { createAntDesignAtomsData } from '../../use-cases/parser/data/ant-design.data'
import { parseAndImportInterface } from './parse-and-import-interface'

interface ParseProps {
  email?: string
}

export const parseCommand: CommandModule<ParseProps, ParseProps> = {
  command: 'parse',
  builder: (argv) =>
    argv
      .options({
        ...getEnvOptions([Env.Dev, Env.Test]),
        email: {
          alias: 'e',
          describe: 'Email of the user to assign to',
          type: 'string',
        },
      })
      .middleware(async ({ env }) => {
        // Perform upsert here
        if (env === Env.Test) {
          await upsertUser(
            {
              auth0Id: v4(),
              email: Config().auth0.cypress_username!,
              username: 'Codelab',
              roles: [Role.Admin],
            },
            (user) => ({ email: user.email }),
          )
        }
      }),
  describe:
    'Parse Ant Design scraped CSV files and insert to application as types',
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
    // await importTypes(createSeedTypesData(), selectedUserId, (type) => ({
    //   name: type.name,
    // }))

    /**
     * (2) Import tag tree
     */
    await importTags(createTagSeedData(), selectedUserId)

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
     * (3) Then parse and import the Ant Design interfaces
     */
    await parseAndImportInterface(selectedUserId)

    return process.exit(0)
  },
}
