import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type AppFragment = {
  __typename?: 'App'
  id: string
  name: string
  owner?:
    | Array<{ __typename?: 'User'; id: string } | null | undefined>
    | null
    | undefined
  pages?: Array<{ __typename?: 'Page'; id: string }> | null | undefined
  rootProviderElement: { __typename?: 'Element'; id: string }
}

export const AppFragmentDoc = gql`
  fragment App on App {
    id
    owner {
      id
    }
    name
    pages {
      id
    }
    rootProviderElement {
      id
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {}
}
export type Sdk = ReturnType<typeof getSdk>
