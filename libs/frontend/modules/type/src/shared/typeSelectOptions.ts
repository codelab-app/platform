import { ITypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeOptions } from './TypeSelect'

/**
 * Non-union type select
 */
export const typeSelectOptions: CreateTypeOptions = (typesDTO) => {
  const types = typesDTO || []

  return types
    .filter((type) => type.kind !== ITypeKind.UnionType)
    .map((i) => ({
      label: i.name,
      value: i.id,
    }))
}
