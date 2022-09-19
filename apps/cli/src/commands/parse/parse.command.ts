import { UserOGM } from '@codelab/backend/adapter/neo4j'
import { Role } from '@codelab/shared/abstract/codegen'
import { Config } from '@codelab/shared/config'
import { createSeedTypesData } from '@codelab/shared/data'
import inquirer from 'inquirer'
import { v4 } from 'uuid'
import { CommandModule } from 'yargs'
import { antdAtomsFactory } from '../../data/atom'
import { upsertUser } from '../../repository/user.repo'
import { getEnvOptions } from '../../shared/command'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { Env } from '../../shared/utils/env'
import { importAtoms } from '../../use-cases/import/import-atoms'
import { importTypes } from '../../use-cases/import/import-types'
import { createAntDesignAtomsData } from '../../use-cases/parser/ant-design'
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
          await upsertUser({
            auth0Id: v4(),
            email: Config().auth0.cypress_username!,
            username: 'Codelab',
            roles: [Role.Admin],
          })
        }
      }),
  describe:
    'Parse Ant Design scraped CSV files and insert to application as types',
  handler: async ({ email }) => {
    const User = await UserOGM({ reinitialize: true })

    const selectedUserId = email
      ? (await User.find({ where: { email } }))[0]?.id
      : (await inquirer.prompt([await selectUserPrompt()])).selectedUserId

    if (!selectedUserId) {
      throw new Error('User not found!')
    }

    console.log('------------------ABC--------------------')

    /**
     * (1) First all our base types first
     */
    await importTypes(createSeedTypesData(), selectedUserId, (type) => ({
      name: type.name,
    }))

    /**
     * (2) Then import all atoms
     */
    await importAtoms({
      atoms: antdAtomsFactory(await createAntDesignAtomsData()),
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
