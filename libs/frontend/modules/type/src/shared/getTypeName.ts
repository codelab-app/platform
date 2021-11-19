import {
  IElementType,
  IEnumType,
  IPrimitiveType,
  IType,
} from '@codelab/shared/abstract/core'
import { TypeTree } from '@codelab/shared/core'
import { TypeModels } from './TypeModels'

export const getTypeName = (
  type: IType | null | undefined,
  typeTree: TypeTree,
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
      return (type as IPrimitiveType).primitiveKind

    case TypeModels.ArrayType: {
      const itemType = typeTree.getArrayItemType(type.id)

      return `Array of ${getTypeName(itemType, typeTree, iteration + 1)}`
    }

    case TypeModels.EnumType:
      return `Enum (${(type as IEnumType).allowedValues
        .map((v) => v.name ?? v.value)
        .join(',')})`
    case TypeModels.InterfaceType:
      return `Interface (${type.name})`
    case TypeModels.ElementType:
      return `Element (${(type as IElementType).elementKind})`
    case TypeModels.LambdaType:
      return `Lambda`
    case TypeModels.ComponentType:
      return `Component`
    default:
      return ''
  }
}
