import type { IBaseType } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'

interface Option {
  label: string
  value: string
}
export type CreateTypeOptions = (
  types?: Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>,
) => Array<Option>

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
