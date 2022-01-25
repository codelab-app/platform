import { IArrayType } from '@codelab/shared/abstract/core'
import { AddTypeToSchemaFn, TypeTransformFn } from '../shared/types'
import { getExtraProperties } from '../shared/utils'

export const transformArrayType: TypeTransformFn<IArrayType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  return {
    type: 'array',
    items: undefined /** we set the item type in {@link addItemTypeToArray} */,
    ...extra,
  }
}

export const addItemTypeToArray: AddTypeToSchemaFn = (
  parentSchema,
  childSchema,
) => {
  parentSchema.items = childSchema
}
