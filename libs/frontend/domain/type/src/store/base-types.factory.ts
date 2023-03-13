import type { BaseTypeFragment } from '@codelab/shared/abstract/codegen'
import {
  CodeMirrorLanguage,
  ElementTypeKind,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
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

export const baseTypesFactory = (type: BaseTypeFragment) => {
  // this is just a fallback
  // except __typename, all fallback properties should be re-fetched later
  switch (type.kind) {
    case ITypeKind.AppType:
      return AppType.create({
        ...type,
        __typename: 'AppType',
      })

    case ITypeKind.ActionType:
      return ActionType.create({
        ...type,
        __typename: 'ActionType',
      })

    case ITypeKind.ElementType:
      return ElementType.create({
        ...type,
        __typename: 'ElementType',
        elementKind: ElementTypeKind.AllElements,
      })

    case ITypeKind.EnumType:
      return EnumType.create({
        ...type,
        __typename: 'EnumType',
        allowedValues: [],
      })

    case ITypeKind.LambdaType:
      return LambdaType.create({
        ...type,
        __typename: 'LambdaType',
      })

    case ITypeKind.CodeMirrorType:
      return CodeMirrorType.create({
        ...type,
        __typename: 'CodeMirrorType',
        language: CodeMirrorLanguage.Css,
      })

    case ITypeKind.PageType:
      return PageType.create({
        ...type,
        __typename: 'PageType',
      })

    case ITypeKind.PrimitiveType:
      return PrimitiveType.create({
        ...type,
        __typename: 'PrimitiveType',
        primitiveKind: PrimitiveTypeKind.String,
      })

    case ITypeKind.ReactNodeType:
      return ReactNodeType.create({
        ...type,
        __typename: 'ReactNodeType',
      })

    case ITypeKind.RenderPropsType:
      return RenderPropsType.create({
        ...type,
        __typename: 'RenderPropsType',
      })

    case ITypeKind.ArrayType:
      return ArrayType.create({
        ...type,
        __typename: 'ArrayType',
      })

    case TypeKind.InterfaceType:
      return InterfaceType.create({
        ...type,
        __typename: 'InterfaceType',
        fields: [],
      })

    case TypeKind.UnionType:
      return UnionType.create({
        ...type,
        __typename: 'UnionType',
        typesOfUnionType: [],
      })

    default:
      throw new Error(`Unknown type kind: ${type.kind}`)
  }
}
