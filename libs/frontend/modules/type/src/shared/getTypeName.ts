import {
  IElementType,
  IEnumType,
  IMonacoType,
  IPrimitiveType,
  IType,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { TypeTree } from '@codelab/shared/core'
import { TypeModels } from './TypeModels'

export const getTypeName = (
  type: Nullish<IType>,
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
    case TypeKind.RenderPropsType:
      return `Render Props Type`
    case TypeKind.ReactNodeType:
      return `React Node Type`
    case TypeKind.UnionType:
      return `Union Type`
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
    case TypeModels.PageType:
      return `Page`
    case TypeModels.AppType:
      return `App`
    case TypeModels.MonacoType:
      return `Monaco (${(type as IMonacoType).language})`
    default:
      return ''
  }
}
