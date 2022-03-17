import { TypeKind } from '@codelab/shared/abstract/core'
import { TypeNonRecursiveFragment } from '../graphql/fragments/Type.fragment.v2.1.graphql.gen'
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

export const typeModelFactory = (type: TypeNonRecursiveFragment) => {
  switch (type.typeKind) {
    case TypeKind.AppType:
      return AppType.fromFragment(type)

    case TypeKind.ElementType:
      return ElementType.fromFragment(type)

    case TypeKind.EnumType:
      return EnumType.fromFragment(type)

    case TypeKind.LambdaType:
      return LambdaType.fromFragment(type)

    case TypeKind.MonacoType:
      return MonacoType.fromFragment(type)

    case TypeKind.PageType:
      return PageType.fromFragment(type)

    case TypeKind.PrimitiveType:
      return PrimitiveType.fromFragment(type)

    case TypeKind.ReactNodeType:
      return ReactNodeType.fromFragment(type)

    case TypeKind.RenderPropsType:
      return RenderPropsType.fromFragment(type)

    case TypeKind.ArrayType:
      return ArrayType.fromFragment(type)

    case TypeKind.InterfaceType:
      return InterfaceType.fromFragment(type)

    case TypeKind.UnionType:
      return UnionType.fromFragment(type)
  }
}
