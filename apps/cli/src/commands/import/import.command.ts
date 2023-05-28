import type { PromiseCallback } from '@codelab/shared/abstract/types'
import { withTracing } from '@codelab/shared/infra/otel'
import type { ArgumentsCamelCase, Argv, CommandModule } from 'yargs'
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
const withTeardown = <Return, Param extends Array<any>>(
  operation: PromiseCallback<Return, Param>,
) => {
  return async (...args: Param): Promise<Return> => {
    try {
      return await operation(...args)
    } finally {
      console.log('Done! Please press Ctrl+C')
    }
  }
}

const importHandlerWithTracing = withTracing(
  'import-command',
  (args: ArgumentsCamelCase<ImportProps>) => importHandler(args),
)

const importHandlerWithTracingAndTeardown = withTeardown(
  importHandlerWithTracing,
)

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
  handler: importHandlerWithTracingAndTeardown,
}
