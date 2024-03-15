import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type TagFragment = {
  id: string
  name: string
  children: Array<{ id: string }>
  descendants: Array<{ id: string }>
  owner: OwnerFragment
  parent?: { id: string } | null
}

export type TagPreviewFragment = { id: string; name: string }

export const TagFragmentDoc = gql`
  fragment Tag on Tag {
    children {
      id
    }
    descendants {
      id
    }
    id
    name
    owner {
      ...Owner
    }
    parent {
      id
    }
  }
  ${OwnerFragmentDoc}
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
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
