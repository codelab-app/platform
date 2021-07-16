const defaultMessage = (fieldNames?: Array<string>, atomName?: string) => {
  if (fieldNames) {
    return `The type is used by the fields ${fieldNames.join(', ')}`
  }

  if (atomName) {
    return `The type is the api of the atom ${atomName}`
  }

  return `The type is used`
}

export class TypeIsUsedError extends Error {
  constructor(
    public readonly fieldNames?: Array<string>,
    public readonly atomName?: string,
    message?: string,
  ) {
    super(message || defaultMessage(fieldNames, atomName))
    this.name = this.constructor.name
  }
}
