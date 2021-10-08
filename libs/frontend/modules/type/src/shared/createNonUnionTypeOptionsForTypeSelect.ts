import { TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeSelectOptions } from './TypeSelect'

export const createNonUnionTypeOptionsForTypeSelect: CreateTypeSelectOptions = (
  getTypesResult,
) => {
  const types = getTypesResult?.getTypes || []

  return types
    .filter((type) => type.typeKind !== TypeKind.UnionType)
    .map((i) => ({
      label: i.name,
      value: i.id,
    }))
}
