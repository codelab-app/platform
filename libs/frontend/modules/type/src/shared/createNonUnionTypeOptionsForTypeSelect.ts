import { CreateTypeSelectOptions } from './TypeSelect'

export const createNonUnionTypeOptionsForTypeSelect: CreateTypeSelectOptions = (
  getTypesResult,
) => {
  const types = getTypesResult?.data || []

  return types
    .filter((type) => type.typeKind !== TypeKind.UnionType)
    .map((i) => ({
      label: i.name,
      value: i.id,
    }))
}
