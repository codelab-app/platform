import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
export type PageFragment = {
  id: string
  name: string
  slug: string
  getServerSideProps?: string | null
  kind: Types.PageKind
  owner: OwnerFragment
  app: { id: string }
  rootElement: { id: string; name: string }
  pageContentContainer?: { id: string } | null
}

export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    slug
    owner {
      ...Owner
    }
    getServerSideProps
    app {
      id
    }
    rootElement {
      id
      name
    }
    pageContentContainer {
      id
    }
    kind
  }
  ${OwnerFragmentDoc}
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
