import { TypeKind } from '@codelab/shared/abstract/core'
import { AddTypeToSchemaFn } from './shared/types'
import { addItemTypeToArray } from './transformers/transform-array-type'
import { addPropertyToInterfaceSchema } from './transformers/transform-interface-type'
import { addChildToUnionType } from './transformers/transform-union-type'

export const addTypeToJsonSchema: AddTypeToSchemaFn = (
  parentSchema,
  childSchema,
  metadata,
) => {
  const parentTypeKind = metadata.parent.typeKind

  switch (parentTypeKind) {
    case TypeKind.InterfaceType:
      addPropertyToInterfaceSchema(parentSchema, childSchema, metadata)
      break

    case TypeKind.UnionType:
      addChildToUnionType(parentSchema, childSchema, metadata)
      break

    case TypeKind.ArrayType:
      addItemTypeToArray(parentSchema, childSchema, metadata)
      break

    default:
      throw new Error(`Can't add child to type ${parentTypeKind}`)
  }
}
