import { Role } from '@codelab/shared/abstract/codegen'
import { EnvBuilder } from '@codelab/shared/env'
import { v4 } from 'uuid'
import { MiddlewareFunction, Options } from 'yargs'
import { upsertUser } from '../repository/user.repo'
import { Stage } from './utils/stage'

export interface ExportProps {
  seedDataPath?: string
  userDataPath?: string
  skipUserData?: boolean
  skipSeedData?: boolean
}

export const seedDataPathOption: { [key: string]: Options } = {
  seedDataPath: {
    alias: 'seed',
    describe: 'File path of the seed data to be exported',
    // demandOption: true,
    type: 'string',
    // default: defaultSeedFilePath,
  },
}

export const userDataPathOption: { [key: string]: Options } = {
  userDataPath: {
    alias: 'user',
    describe: 'File path of the user data to be exported',
    // demandOption: true,
    type: 'string',
  },
}

export const skipUserDataOption: { [key: string]: Options } = {
  skipUserData: {
    // alias: 's',
    describe: 'Skip user data',
    type: 'boolean',
  },
}

export const skipSeedDataOption: { [key: string]: Options } = {
  skipSeedData: {
    // alias: 's',
    describe: 'Skip seed data',
    type: 'boolean',
  },
}

export const assignUserOption: { [key: string]: Options } = {
  email: {
    alias: 'e',
    describe: 'Email of the user to assign to',
    type: 'string',
  },
}

export const upsertUserMiddleware: MiddlewareFunction<unknown> = async ({
  env,
}) => {
  // Perform upsert here
  if (env === Stage.Test) {
    await upsertUser(
      {
        auth0Id: v4(),
        email: EnvBuilder().auth0.cypress_username!,
        username: 'Codelab',
        roles: [Role.Admin],
      },
      (user) => ({ email: user.email }),
    )
  }
}
