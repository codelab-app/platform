import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
export type TagFragment = {
  id: string
  isRoot: boolean
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
    isRoot
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
