import type { PromiseCallback } from '@codelab/shared/abstract/types'
import type { Argv, CommandModule } from 'yargs'
import { getStageOptions, loadStageMiddleware } from '../../shared/command'
import {
  assignUserOption,
  seedDataPathOption,
  skipSeedDataOption,
  skipUserDataOption,
  upsertUserMiddleware,
  userDataPathOption,
} from '../../shared/path-args'
import { Stage } from '../../shared/utils/stage'
import type { ImportProps } from './import.handler'
import { importHandler } from './import.handler'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withTeardown = <Param extends Array<any>>(
  operation: PromiseCallback<void, Param>,
) => {
  return async (...args: Param): Promise<void> => {
    try {
      return await operation(...args)
    } finally {
      console.log('Done! Please press Ctrl+C')
    }
  }
}

const importHandlerWithTeardown = withTeardown(importHandler)

/**
 * Imports seed data and/or user data.
 *
 * User data includes apps, user type, resources
 */
export const importCommand: CommandModule<unknown, ImportProps> = {
  builder: (argv) =>
    argv
      .options({
        ...assignUserOption,
        ...skipUserDataOption,
        ...skipSeedDataOption,
        ...userDataPathOption,
        ...seedDataPathOption,
        ...getStageOptions([Stage.Dev, Stage.Test]),
      })
      .middleware([
        loadStageMiddleware,
        upsertUserMiddleware,
        // Issue with inferring option
      ]) as Argv<ImportProps>,
  command: 'import',
  describe: 'Import user data',
  // https://stackoverflow.com/questions/63912968/where-can-i-find-documentation-for-builder-in-yargs-npm
  /**
   *
   * @param file File for the user data
   */
  handler: importHandlerWithTeardown,
}
