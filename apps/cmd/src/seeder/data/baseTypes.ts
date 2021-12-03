import { CreateTypeInput } from '@codelab/backend/modules/type'
import {
  ElementTypeKind,
  MonacoLanguage,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'

export enum BaseTypeName {
  Lambda = 'Lambda',
  Component = 'Component',
  Element = 'Element',
  ChildElement = 'Child Element',
  DescendantElement = 'Descendant Element',
  String = 'String',
  Boolean = 'Boolean',
  Float = 'Float',
  Integer = 'Integer',
  RenderProps = 'RenderProps',
  ReactNode = 'ReactNode',
  Union = 'Union',
  MonacoTypeScript = 'MonacoTypeScript',
  MonacoJavaScript = 'MonacoJavaScript',
  MonacoCss = 'MonacoCss',
  MonacoGraphql = 'MonacoGraphql',
  MonacoJson = 'MonacoJson',
  Page = 'Page',
  App = 'App',
}

export const baseTypes: Array<CreateTypeInput> = [
  {
    name: BaseTypeName.ReactNode,
    typeKind: TypeKind.RenderPropsType,
  },
  {
    name: BaseTypeName.RenderProps,
    typeKind: TypeKind.RenderPropsType,
  },
  {
    name: BaseTypeName.Union,
    typeKind: TypeKind.UnionType,
  },
  {
    name: BaseTypeName.String,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: {
      primitiveKind: PrimitiveTypeKind.String,
    },
  },
  {
    name: BaseTypeName.Boolean,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Boolean },
  },
  {
    name: BaseTypeName.Float,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Float },
  },
  {
    name: BaseTypeName.Integer,
    typeKind: TypeKind.PrimitiveType,
    primitiveType: { primitiveKind: PrimitiveTypeKind.Integer },
  },
  {
    name: BaseTypeName.Lambda,
    typeKind: TypeKind.LambdaType,
  },
  {
    name: BaseTypeName.ChildElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.ChildrenOnly,
    },
  },
  {
    name: BaseTypeName.DescendantElement,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.DescendantsOnly,
    },
  },
  {
    name: BaseTypeName.Element,
    typeKind: TypeKind.ElementType,
    elementType: {
      kind: ElementTypeKind.AllElements,
    },
  },
  {
    name: BaseTypeName.Component,
    typeKind: TypeKind.ComponentType,
  },
  {
    name: BaseTypeName.MonacoCss,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.CSS,
    },
  },
  {
    name: BaseTypeName.MonacoJavaScript,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.JavaScript,
    },
  },
  {
    name: BaseTypeName.MonacoJson,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.JSON,
    },
  },
  {
    name: BaseTypeName.MonacoGraphql,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.Graphql,
    },
  },
  {
    name: BaseTypeName.MonacoTypeScript,
    typeKind: TypeKind.MonacoType,
    monacoType: {
      language: MonacoLanguage.TypeScript,
    },
  },
  {
    name: BaseTypeName.Page,
    typeKind: TypeKind.PageType,
  },
  {
    name: BaseTypeName.App,
    typeKind: TypeKind.AppType,
  },
]
