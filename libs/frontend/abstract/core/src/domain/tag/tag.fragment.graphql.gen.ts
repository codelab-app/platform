import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type TagFragment = {
  id: string
  name: string
  isRoot?: boolean | null
  parent?: { id: string } | null
  children: Array<{ id: string }>
  descendants: Array<{ id: string }>
}

export type TagPreviewFragment = { id: string; name: string }

export const TagFragmentDoc = gql`
  fragment Tag on Tag {
    id
    name
    parent {
      id
    }
    children {
      id
    }
    isRoot
    descendants {
      id
    }
  }
`
export const TagPreviewFragmentDoc = gql`
  fragment TagPreview on Tag {
    id
    name
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
