import { TypeKind } from '@codelab/shared/abstract/core'
import { TypeFragment } from '../graphql'
import {
  AppType,
  ArrayType,
  ElementType,
  EnumType,
  InterfaceType,
  LambdaType,
  MonacoType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  UnionType,
} from './models'

export const typeClassFactory = (typeKind: TypeKind) => {
  switch (typeKind) {
    case TypeKind.AppType:
      return AppType

    case TypeKind.ElementType:
      return ElementType

    case TypeKind.EnumType:
      return EnumType

    case TypeKind.LambdaType:
      return LambdaType

    case TypeKind.MonacoType:
      return MonacoType

    case TypeKind.PageType:
      return PageType

    case TypeKind.PrimitiveType:
      return PrimitiveType

    case TypeKind.ReactNodeType:
      return ReactNodeType

    case TypeKind.RenderPropsType:
      return RenderPropsType

    case TypeKind.ArrayType:
      return ArrayType

    case TypeKind.InterfaceType:
      return InterfaceType

    case TypeKind.UnionType:
      return UnionType
  }

  throw new Error(`Unknown type kind: ${typeKind}`)
}

export const typeFactory = (type: TypeFragment) => {
  return typeClassFactory(type.typeKind).fromFragment(type as any)
}
