import { AppError, ErrorCode } from '@codelab/backend/infra'

export class TypeUnusedError extends AppError {
  constructor(
    public readonly fieldNames?: Array<string>,
    public readonly atomName?: string,
    message?: string,
  ) {
    super(ErrorCode.TypeIsUsed, message || defaultMessage(fieldNames, atomName))
  }
}

const defaultMessage = (fieldNames?: Array<string>, atomName?: string) => {
  if (fieldNames) {
    return `The type is used by the fields ${fieldNames.join(', ')}`
  }

  if (atomName) {
    return `The type is the api of the atom ${atomName}`
  }

  return `The type is used`
}
