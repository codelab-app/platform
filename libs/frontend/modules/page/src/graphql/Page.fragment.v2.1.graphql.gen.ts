import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type PageFragment = {
  __typename?: 'Page'
  id: string
  name: string
  app: {
    __typename?: 'App'
    id: string
    rootProviderElement: { __typename?: 'Element'; id: string }
  }
  rootElement: {
    __typename?: 'Element'
    id: string
    name?: string | null | undefined
  }
}

export type PageFullFragment = {
  __typename?: 'Page'
  id: string
  name: string
  app: {
    __typename?: 'App'
    id: string
    rootProviderElement: { __typename?: 'Element'; id: string }
  }
  rootElement: {
    __typename?: 'Element'
    id: string
    name?: string | null | undefined
  }
}

export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
    app {
      id
    }
    app {
      rootProviderElement {
        id
      }
    }
    rootElement {
      id
      name
    }
  }
`
export const PageFullFragmentDoc = gql`
  fragment PageFull on Page {
    ...Page
  }
  ${PageFragmentDoc}
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
