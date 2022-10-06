import {
  BaseTypeFragment,
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
  // except __typename, all fallback properties should be refeched later
  switch (type.kind) {
    case ITypeKind.AppType:
      return AppType.hydrate({
        ...type,
        __typename: 'AppType',
      })

    case ITypeKind.ActionType:
      return ActionType.hydrate({
        ...type,
        __typename: 'ActionType',
      })

    case ITypeKind.ElementType:
      return ElementType.hydrate({
        ...type,
        __typename: 'ElementType',
        elementKind: ElementTypeKind.AllElements,
      })

    case ITypeKind.EnumType:
      return EnumType.hydrate({
        ...type,
        __typename: 'EnumType',
        allowedValues: [],
      })

    case ITypeKind.LambdaType:
      return LambdaType.hydrate({
        ...type,
        __typename: 'LambdaType',
      })

    case ITypeKind.CodeMirrorType:
      return CodeMirrorType.hydrate({
        ...type,
        __typename: 'CodeMirrorType',
        language: CodeMirrorLanguage.Css,
      })

    case ITypeKind.PageType:
      return PageType.hydrate({
        ...type,
        __typename: 'PageType',
      })

    case ITypeKind.PrimitiveType:
      return PrimitiveType.hydrate({
        ...type,
        __typename: 'PrimitiveType',
        primitiveKind: PrimitiveTypeKind.String,
      })

    case ITypeKind.ReactNodeType:
      return ReactNodeType.hydrate({
        ...type,
        __typename: 'ReactNodeType',
      })

    case ITypeKind.RenderPropsType:
      return RenderPropsType.hydrate({
        ...type,
        __typename: 'RenderPropsType',
      })

    case ITypeKind.ArrayType:
      return ArrayType.hydrate({
        ...type,
        __typename: 'ArrayType',
        itemType: { id: '', name: '' },
      })

    case TypeKind.InterfaceType:
      return InterfaceType.hydrate({
        ...type,
        __typename: 'InterfaceType',
        ownerConnection: {
          edges: [
            {
              data: '{}',
            },
          ],
        },
        fieldsConnection: { edges: [] },
      })

    case TypeKind.UnionType:
      return UnionType.hydrate({
        ...type,
        __typename: 'UnionType',
        typesOfUnionType: [],
      })

    default:
      throw new Error(`Unknown type kind: ${type.kind}`)
  }
}
