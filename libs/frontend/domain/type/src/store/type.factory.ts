import { ITypeDTO, ITypeKind } from '@codelab/frontend/abstract/core'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import {
  ActionType,
  AppType,
  ArrayType,
  CodeMirrorType,
  ElementType,
  EnumType,
  InterfaceType,
  LambdaType,
  PageType,
  PrimitiveType,
  ReactNodeType,
  RenderPropsType,
  UnionType,
} from './models'

export const typeFactory = (type: ITypeDTO) => {
  switch (type.__typename) {
    case ITypeKind.AppType:
      return AppType.hydrate(type)

    case ITypeKind.ActionType:
      return ActionType.hydrate(type)

    case ITypeKind.ElementType:
      return ElementType.hydrate(type)

    case ITypeKind.EnumType:
      return EnumType.hydrate(type)

    case ITypeKind.LambdaType:
      return LambdaType.hydrate(type)

    case ITypeKind.CodeMirrorType:
      return CodeMirrorType.hydrate(type)

    case ITypeKind.PageType:
      return PageType.hydrate(type)

    case ITypeKind.PrimitiveType:
      return PrimitiveType.hydrate(type)

    case ITypeKind.ReactNodeType:
      return ReactNodeType.hydrate(type)

    case ITypeKind.RenderPropsType:
      return RenderPropsType.hydrate(type)

    case ITypeKind.ArrayType:
      return ArrayType.hydrate(type)

    case TypeKind.InterfaceType:
      return InterfaceType.hydrate(type)

    case TypeKind.UnionType:
      return UnionType.hydrate(type)

    default:
      throw new Error(`Unknown type kind: ${type.kind}`)
  }
}
