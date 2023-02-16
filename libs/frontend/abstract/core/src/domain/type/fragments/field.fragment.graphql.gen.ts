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
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
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
        id
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
