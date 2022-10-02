import * as Types from '@codelab/shared/abstract/codegen'

import { PageFragment } from '../page/page.fragment.graphql.gen'
import { ElementFragment } from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { PageFragmentDoc } from '../page/page.fragment.graphql.gen'
import { ElementFragmentDoc } from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type RedirectedAppFragment = {
  id: string
  name: string
  slug: string
  owner: { username: string }
}

export type AppPreviewFragment = {
  id: string
  name: string
  slug: string
  owner: { id: string }
  pages: Array<PageFragment>
  store: { id: string }
}

export type AppFragment = {
  id: string
  name: string
  slug: string
  owner: { id: string }
  pages: Array<PageFragment>
  store: { id: string }
}

export type PageBuilderAppFragment = {
  id: string
  name: string
  slug: string
  owner: { id: string }
  pages: Array<{
    id: string
    name: string
    slug: string
    rootElement: {
      descendantElements: Array<ElementFragment>
    } & ElementFragment
    app: { id: string }
  }>
  store: StoreFragment
}

export const RedirectedAppFragmentDoc = gql`
  fragment RedirectedApp on App {
    id
    name
    slug
    owner {
      username
    }
  }
`
export const AppPreviewFragmentDoc = gql`
  fragment AppPreview on App {
    id
    name
    slug
    owner {
      id
    }
    pages {
      ...Page
    }
    store {
      id
    }
  }
  ${PageFragmentDoc}
`
export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    slug
    owner {
      id
    }
    pages {
      ...Page
    }
    store {
      id
    }
  }
  ${PageFragmentDoc}
`
export const PageBuilderAppFragmentDoc = gql`
  fragment PageBuilderApp on App {
    id
    name
    slug
    owner {
      id
    }
    pages(where: { id: $pageId }) {
      id
      name
      slug
      rootElement {
        ...Element
        descendantElements {
          ...Element
        }
      }
      app {
        id
      }
    }
    store {
      ...Store
    }
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
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
