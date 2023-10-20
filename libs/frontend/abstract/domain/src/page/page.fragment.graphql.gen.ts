import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type PagePreviewFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  rootElement: { id: string }
  store: { id: string }
}

export type PageFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  pageContentContainer?: { id: string } | null
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  store: StoreFragment
}

export type PageDevelopmentFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  pageContentContainer?: { id: string } | null
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  store: StoreFragment
}

export type PageProductionFragment = {
  id: string
  kind: Types.PageKind
  name: string
  slug: string
  url: string
  app: { id: string }
  pageContentContainer?: { id: string } | null
  rootElement: {
    descendantElements: Array<ElementProductionFragment>
  } & ElementProductionFragment
  store: StoreFragment
}

export const PagePreviewFragmentDoc = gql`
  fragment PagePreview on Page {
    app {
      id
    }
    id
    kind
    name
    rootElement {
      id
    }
    store {
      id
    }
    url
  }
`
export const PageFragmentDoc = gql`
  fragment Page on Page {
    app {
      id
    }
    id
    kind
    name
    pageContentContainer {
      id
    }
    rootElement {
      descendantElements {
        ...Element
      }
      ...Element
    }
    store {
      ...Store
    }
    url
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const PageDevelopmentFragmentDoc = gql`
  fragment PageDevelopment on Page {
    app {
      id
    }
    id
    kind
    name
    pageContentContainer {
      id
    }
    rootElement {
      descendantElements {
        ...Element
      }
      ...Element
    }
    store {
      ...Store
    }
    url
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const PageProductionFragmentDoc = gql`
  fragment PageProduction on Page {
    app {
      id
    }
    id
    kind
    name
    pageContentContainer {
      id
    }
    rootElement {
      descendantElements {
        ...ElementProduction
      }
      ...ElementProduction
    }
    slug
    store {
      ...Store
    }
    url
  }
  ${ElementProductionFragmentDoc}
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
