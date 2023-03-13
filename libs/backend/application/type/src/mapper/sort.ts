import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'

export const sortInterfaceTypesFields = (
  interfaceTypes: Array<OGM_TYPES.InterfaceType>,
) => {
  return interfaceTypes.map((interfaceType) => ({
    ...interfaceType,
    fields: interfaceType.fields.sort((a, b) => (a.key > b.key ? 1 : -1)),
  }))
}
