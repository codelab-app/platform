/**
 * Not supposed to put non-abstract here, but for organization sake it works okay. Also this doesn't depend on any internal libs.
 */
import type { TAnySchema } from '@sinclair/typebox'
import type { ValueError } from '@sinclair/typebox/compiler'
import { TypeCompiler, ValueErrorType } from '@sinclair/typebox/compiler'
import { StandardValidator } from 'typebox-validators/standard'

/**
 * Removes unrecognized properties from the validated data
 */
export const ValidateAndClean = <T extends TAnySchema>(
  schema: T,
  values: unknown,
) => {
  const validator = new StandardValidator(schema)

  return validator.validateAndCleanCopy(values as Readonly<unknown>)
}

export const Validate = <T extends TAnySchema>(
  schema: T,
  values: Readonly<unknown>,
) => {
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
