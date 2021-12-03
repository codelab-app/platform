import { TypeKind } from '@codelab/shared/abstract/core'
import { TypeModels } from './TypeModels'

export const typenameToTypeKind = (typename: string) => {
  console.log(typename)

  switch (typename) {
    case TypeModels.InterfaceType:
      return TypeKind.InterfaceType
    case TypeModels.PrimitiveType:
      return TypeKind.PrimitiveType
    case TypeModels.ArrayType:
      return TypeKind.ArrayType
    case TypeModels.EnumType:
      return TypeKind.EnumType
    case TypeModels.LambdaType:
      return TypeKind.LambdaType
    case TypeModels.UnionType:
      return TypeKind.UnionType
    case TypeModels.MonacoType:
      return TypeKind.MonacoType
    case TypeModels.ElementType:
      return TypeKind.ElementType
    case TypeModels.ComponentType:
      return TypeKind.ComponentType
    case TypeModels.ReactNodeType:
      return TypeKind.ReactNodeType
    case TypeModels.RenderPropsType:
      return TypeKind.RenderPropsType
    case TypeModels.PageType:
      return TypeKind.PageType
    case TypeModels.AppType:
      return TypeKind.AppType
  }

  throw new Error("Can't recognize typename of type")
}
