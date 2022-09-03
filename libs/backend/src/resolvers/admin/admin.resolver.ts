import { MutationExecuteCommandArgs } from '@codelab/shared/abstract/codegen'
import { IFieldResolver } from '@graphql-tools/utils/Interfaces'
import * as execa from 'execa'

export const executeCommand: IFieldResolver<
  any,
  any,
  MutationExecuteCommandArgs
> = async (parent, args) => {
  try {
    const results = execa.commandSync(args.input.command, {
      stdio: 'inherit',
    })

    return {
      success: true,
      data: results.stdout,
    }
  } catch (e) {
    console.error((e as Error).message)

    return {
      success: false,
      data: (e as Error).message,
    }
  }
}
