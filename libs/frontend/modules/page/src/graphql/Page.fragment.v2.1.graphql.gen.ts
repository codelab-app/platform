import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type PageFragment = {
  id: string
  name: string
  app: { id: string; rootProviderElement: { id: string } }
  rootElement: { id: string; name?: string | null | undefined }
}

export type PageFullFragment = PageFragment

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
