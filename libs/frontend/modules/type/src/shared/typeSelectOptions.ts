import { ITypeKind } from '@codelab/shared/abstract/core'
import { CreateTypeSelectOptions } from './TypeSelect'

/**
 * Non-union type select
 */
export const typeSelectOptions: CreateTypeSelectOptions = (getTypesResult) => {
  const types = getTypesResult?.data || []

  return types
    .filter((type) => type.kind !== ITypeKind.UnionType)
    .map((i) => ({
      label: i.name,
      value: i.id,
    }))
}
