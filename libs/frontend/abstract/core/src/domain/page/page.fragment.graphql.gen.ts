import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type PageFragment = {
  id: string
  name: string
  slug: string
  getServerSideProps?: string | null
  app: { id: string }
  rootElement: { id: string; name?: string | null }
}

export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    slug
    getServerSideProps
    app {
      id
    }
    rootElement {
      id
      name
    }
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
