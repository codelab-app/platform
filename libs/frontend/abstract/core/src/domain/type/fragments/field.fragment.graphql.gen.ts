import * as Types from '@codelab/shared/abstract/codegen'

import {
  PropFragment,
  PropMapBindingFragment,
} from '../../prop/prop.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  PropFragmentDoc,
  PropMapBindingFragmentDoc,
} from '../../prop/prop.fragment.graphql.gen'
export type FieldFragment = {
  id: string
  key: string
  name?: string | null
  description?: string | null
  validationRules?: string | null
  fieldType:
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
    | { id: string; kind: Types.TypeKind }
  defaultValues?: PropFragment | null
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
        id
        kind
      }
    }
    defaultValues {
      ...Prop
    }
  }
  ${PropFragmentDoc}
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
