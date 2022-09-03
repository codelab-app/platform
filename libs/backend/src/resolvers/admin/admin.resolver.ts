import { MutationExecuteCommandArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import * as execa from 'execa'
import { ExecaSyncError } from 'execa'

export const executeCommand: IFieldResolver<
  any,
  any,
  MutationExecuteCommandArgs
> = async (parent, args) => {
  try {
    const results = execa.commandSync(args.input.command, {
      stdio: 'pipe',
    })

    console.log(results)

    return {
      success: true,
      data: results.stdout,
    }
  } catch (e) {
    const results = e as ExecaSyncError

    console.error(results)

    return {
      success: false,
      data: results.stderr,
    }
  }
}
