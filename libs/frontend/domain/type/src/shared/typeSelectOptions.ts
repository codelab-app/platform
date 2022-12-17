import { ITypeKind } from '@codelab/shared/abstract/core'
import type { CreateTypeOptions } from './TypeSelect'

/**
 * Non-union type select
 */
export const typeSelectOptions: CreateTypeOptions = (types = []) => {
  return types
    .filter((type) => type.kind !== ITypeKind.UnionType)
    .map((type) => ({
      label: type.name,
      value: type.id,
    }))
}
