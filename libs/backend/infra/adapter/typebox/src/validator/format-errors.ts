import { type ValueError, ValueErrorType } from '@sinclair/typebox/errors'

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
