import { TypeKind } from '@codelab/shared/abstract/core'
import { AddTypeToSchemaFn } from './shared/types'
import { addItemTypeToArray } from './transformers/array-type-to-json-schema'
import { addPropertyToInterfaceSchema } from './transformers/interface-type-to-json-schema'
import { addChildToUnionType } from './transformers/union-type-to-json-schema'

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
