/**
 * Not supposed to put non-abstract here, but for organization sake it works okay. Also this doesn't depend on any internal libs.
 */
import type { TAnySchema } from '@sinclair/typebox'
import type { ValueError } from '@sinclair/typebox/compiler'
import { TypeCompiler, ValueErrorType } from '@sinclair/typebox/compiler'

export const Validate = <T extends TAnySchema>(schema: T, values: unknown) => {
  const Compiler = TypeCompiler.Compile(schema)

  if (!Compiler.Check(values)) {
    const errors = formatErrors([...Compiler.Errors(values)])

    throw new Error(errors)
  }

  return values
}

const formatErrors = (errors: Array<ValueError>) => {
  return errors
    .map(
      (error, index) =>
        `Error ${index + 1}: ${ValueErrorType[error.type]} - ${
          error.message
        } (Path: ${error.path})`,
    )
    .join('\n')
}
