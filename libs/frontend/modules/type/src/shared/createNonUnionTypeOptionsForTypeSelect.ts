import { TypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeSelectOptions } from './TypeSelect'

export const createNonUnionTypeOptionsForTypeSelect: CreateTypeSelectOptions = (
  getTypesResult,
) => {
  const types = getTypesResult?.types || []

  return types
    .filter((type: any) => type.typeKind !== TypeKind.UnionType)
    .map((i: any) => ({
      label: i.name,
      value: i.id,
    }))
}
