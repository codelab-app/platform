import { ITypeTree, ITypeVertex } from '@codelab/shared/abstract/core'
import {
  __ElementTypeFragment,
  __EnumTypeFragment,
  __PrimitiveTypeFragment,
} from '@codelab/shared/codegen/graphql'
import { TypeModels } from './TypeModels'

export const getTypeName = (
  type: ITypeVertex | null | undefined,
  typeTree: ITypeTree,
  iteration = 0,
): string => {
  if (!type) {
    return ''
  }

  if (iteration > 10) {
    return ''
  }

  const kind = type.typeKind

  switch (kind) {
    case TypeModels.PrimitiveType:
      return (type as __PrimitiveTypeFragment).primitiveKind

    case TypeModels.ArrayType: {
      const itemType = typeTree.getArrayItemType(type.id)

      return `Array of ${getTypeName(itemType, typeTree, iteration + 1)}`
    }

    case TypeModels.EnumType:
      return `Enum (${(type as __EnumTypeFragment).allowedValues
        .map((v) => v.name || v.value)
        .join(',')})`
    case TypeModels.InterfaceType:
      return `Interface (${type.name})`
    case TypeModels.ElementType:
      return `Element (${(type as __ElementTypeFragment).kind})`
    case TypeModels.LambdaType:
      return `Lambda`
    case TypeModels.ComponentType:
      return `Component`
    default:
      return ''
  }
}
