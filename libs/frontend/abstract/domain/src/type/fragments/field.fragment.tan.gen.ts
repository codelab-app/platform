import * as Types from '@codelab/shared/abstract/codegen'

export type FieldFragment = {
  defaultValues?: string | null
  description?: string | null
  id: string
  key: string
  name?: string | null
  validationRules?: string | null
  api: { id: string }
  fieldType:
    | {
        __typename: 'ActionType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | { __typename: 'AppType'; id: string; kind: Types.TypeKind; name: string }
    | {
        __typename: 'ArrayType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'CodeMirrorType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'ElementType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | { __typename: 'EnumType'; id: string; kind: Types.TypeKind; name: string }
    | {
        __typename: 'InterfaceType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'LambdaType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | { __typename: 'PageType'; id: string; kind: Types.TypeKind; name: string }
    | {
        __typename: 'PrimitiveType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'ReactNodeType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'RenderPropType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'RichTextType'
        id: string
        kind: Types.TypeKind
        name: string
      }
    | {
        __typename: 'UnionType'
        id: string
        kind: Types.TypeKind
        name: string
      }
  nextSibling?: { id: string } | null
  prevSibling?: { id: string } | null
}

export const FieldFragmentDoc = `
    fragment Field on Field {
  api {
    ... on InterfaceType {
      id
    }
  }
  defaultValues
  description
  fieldType {
    ... on IBaseType {
      __typename
      id
      kind
      name
    }
  }
  id
  key
  name
  nextSibling {
    id
  }
  prevSibling {
    id
  }
  validationRules
}
    `
