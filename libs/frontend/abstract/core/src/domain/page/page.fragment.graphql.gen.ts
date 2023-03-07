import * as Types from '@codelab/shared/abstract/codegen'

import { ElementFragment } from '../element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ElementFragmentDoc } from '../element/element.fragment.graphql.gen'
export type PageFragment = {
  id: string
  name: string
  slug: string
  getServerSideProps?: string | null
  kind: Types.PageKind
  app: { id: string }
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  pageContentContainer?: { id: string } | null
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
      ...Element
      descendantElements {
        ...Element
      }
    }
    pageContentContainer {
      id
    }
    kind
  }
  ${ElementFragmentDoc}
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
