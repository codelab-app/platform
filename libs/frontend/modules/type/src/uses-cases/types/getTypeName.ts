import {
  IElementTypeVertex,
  IEnumTypeVertex,
  IPrimitiveTypeVertex,
  ITypeVertex,
} from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { TypeModels } from './TypeModels'

export const getTypeName = (
  type: ITypeVertex | null | undefined,
  typeTree: TypeTree<any, any>,
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
      return (type as IPrimitiveTypeVertex).primitiveKind

    case TypeModels.ArrayType: {
      const itemType = typeTree.getArrayItemType(type.id)

      return `Array of ${getTypeName(itemType, typeTree, iteration + 1)}`
    }

    case TypeModels.EnumType:
      return `Enum (${(type as IEnumTypeVertex).allowedValues
        .map((v) => v.name ?? v.value)
        .join(',')})`
    case TypeModels.InterfaceType:
      return `Interface (${type.name})`
    case TypeModels.ElementType:
      return `Element (${(type as IElementTypeVertex).kind})`
    case TypeModels.LambdaType:
      return `Lambda`
    case TypeModels.ComponentType:
      return `Component`
    default:
      return ''
  }
}
