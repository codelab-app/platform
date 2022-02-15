export const interfaceNotExistingErrorFactory =
  (interfaceTypeId: string) => () =>
    new Error(`Interface type with id ${interfaceTypeId} not found`)

export const targetTypeNotExistingErrorFactory = (targetTypeId: string) => () =>
  new Error(`Target type with id ${targetTypeId} not found`)

export const duplicatedKeyErrorFactory = (key: string) => () =>
  new Error(`Field with key ${key} already exists on this interface`)

export const recursiveTypeErrorFactory =
  (parentType: string, childType: string) => () =>
    new Error(`Cannot create a recursive type ${parentType} -> ${childType}`)
