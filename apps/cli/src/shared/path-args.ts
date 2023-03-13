import { User, UserRepository } from '@codelab/backend/domain/user'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { EnvBuilder } from '@codelab/shared/env'
import { v4 } from 'uuid'
import type { MiddlewareFunction, Options } from 'yargs'
import { Stage } from './utils/stage'

export interface ExportProps {
  seedDataPath?: string
  skipSeedData?: boolean
  skipUserData?: boolean
  userDataPath?: string
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
  stage,
}) => {
  /**
   * This may cause errors. The auth0Id may not match up
   *
   * Perform upsert here
   */
  if (stage === Stage.Dev) {
    const userRepository: UserRepository = new UserRepository()

    const user = new User({
      auth0Id: v4(),
      email: EnvBuilder().auth0.cypress_username!,
      id: v4(),
      roles: [OGM_TYPES.Role.Admin],
      username: 'Codelab',
    })

    await userRepository.save(user, { email: user.email })
  }
}
