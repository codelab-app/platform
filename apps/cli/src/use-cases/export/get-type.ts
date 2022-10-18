import { OGM_TYPES } from '@codelab/backend/abstract/codegen'

export const sortInterfaceTypesFields = (
  interfaceTypes: Array<OGM_TYPES.InterfaceType>,
) => {
  return interfaceTypes.map((interfaceType) => ({
    ...interfaceType,
    fields: interfaceType.fields.sort((a, b) => (a.key > b.key ? 1 : -1)),
  }))
}
