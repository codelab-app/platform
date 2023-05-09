import type { InterfaceType } from '@codelab/backend/abstract/codegen'

export const sortInterfaceTypesFields = (
  interfaceTypes: Array<InterfaceType>,
) => {
  return interfaceTypes.map((interfaceType) => ({
    ...interfaceType,
    fields: interfaceType.fields.sort((a, b) => (a.id > b.id ? 1 : -1)),
  }))
}
