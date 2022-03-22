import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type Field_InterfaceTypeEdge_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type Field_InterfaceTypeFieldsRelationship_Fragment = {
  key: string
  name?: string | null | undefined
  description?: string | null | undefined
}

export type FieldFragment =
  | Field_InterfaceTypeEdge_Fragment
  | Field_InterfaceTypeFieldsRelationship_Fragment

export type InterfaceTypeEdgeFragment = {
  target: string
  source: string
} & Field_InterfaceTypeEdge_Fragment

export const FieldFragmentDoc = gql`
  fragment Field on Field {
    key
    name
    description
  }
`
export const InterfaceTypeEdgeFragmentDoc = gql`
  fragment InterfaceTypeEdge on InterfaceTypeEdge {
    ...Field
    target
    source
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
