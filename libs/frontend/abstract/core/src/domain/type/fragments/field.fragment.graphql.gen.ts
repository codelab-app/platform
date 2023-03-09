import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type FieldFragment = {
  id: string
  key: string
  name?: string | null
  description?: string | null
  validationRules?: string | null
  defaultValues?: string | null
  fieldType:
    | { __typename: 'ActionType'; id: string; kind: Types.TypeKind }
    | { __typename: 'AppType'; id: string; kind: Types.TypeKind }
    | { __typename: 'ArrayType'; id: string; kind: Types.TypeKind }
    | { __typename: 'BaseType'; id: string; kind: Types.TypeKind }
    | { __typename: 'CodeMirrorType'; id: string; kind: Types.TypeKind }
    | { __typename: 'ElementType'; id: string; kind: Types.TypeKind }
    | { __typename: 'EnumType'; id: string; kind: Types.TypeKind }
    | { __typename: 'InterfaceType'; id: string; kind: Types.TypeKind }
    | { __typename: 'LambdaType'; id: string; kind: Types.TypeKind }
    | { __typename: 'PageType'; id: string; kind: Types.TypeKind }
    | { __typename: 'PrimitiveType'; id: string; kind: Types.TypeKind }
    | { __typename: 'ReactNodeType'; id: string; kind: Types.TypeKind }
    | { __typename: 'RenderPropsType'; id: string; kind: Types.TypeKind }
    | { __typename: 'UnionType'; id: string; kind: Types.TypeKind }
  api: { id: string }
}

export const FieldFragmentDoc = gql`
  fragment Field on Field {
    id
    key
    name
    description
    validationRules
    fieldType {
      ... on IBaseType {
        __typename
        id
        kind
      }
    }
    api {
      ... on InterfaceType {
        id
      }
    }
    defaultValues
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
