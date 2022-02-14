import { MonacoLanguage } from '@codelab/shared/abstract/codegen-v2'
import {
  BaseTypeKind,
  ElementTypeKind,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { CreateTypeInput } from '../../use-cases/type/create-type'

/**
 * The core types that we rely on being there at any point when creating more complex types
 */
export const baseTypes: Array<CreateTypeInput> = [
  {
    name: BaseTypeKind.String,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: {
      primitiveKind: PrimitiveTypeKind.String,
    },
  },
  {
    name: BaseTypeKind.Boolean,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Boolean },
  },
  {
    name: BaseTypeKind.Float,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Float },
  },
  {
    name: BaseTypeKind.Integer,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Integer },
  },
  {
    name: BaseTypeKind.Lambda,
    typeKind: TypeKind.LambdaType,
  },
  {
    name: BaseTypeKind.ChildElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.ChildrenOnly,
    },
  },
  {
    name: BaseTypeKind.DescendantElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.DescendantsOnly,
    },
  },
  {
    name: BaseTypeKind.Element,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.AllElements,
    },
  },
  {
    name: BaseTypeKind.RenderProps,
    typeKind: TypeKind.RenderPropsType,
  },
  {
    name: BaseTypeKind.ReactNode,
    typeKind: TypeKind.ReactNodeType,
  },
  {
    name: BaseTypeKind.MonacoCss,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.css,
    },
  },
  {
    name: BaseTypeKind.MonacoJavaScript,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.javascript,
    },
  },
  {
    name: BaseTypeKind.MonacoJson,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.json,
    },
  },
  {
    name: BaseTypeKind.MonacoGraphql,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.graphqlDev,
    },
  },
  {
    name: BaseTypeKind.MonacoTypeScript,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.typescript,
    },
  },
  {
    name: BaseTypeKind.Page,
    typeKind: TypeKind.PageType,
  },
  {
    name: BaseTypeKind.App,
    typeKind: TypeKind.AppType,
  },
]
