import * as Types from '@codelab/shared/abstract/codegen'

import { StoreFragment } from '../store/store.fragment.graphql.gen'
import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
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
  rootElement: { id: string }
  store: StoreFragment
  elements: Array<ElementFragment>
}

export type PageDevelopmentFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  pageContentContainer?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
  elements: Array<ElementFragment>
}

export type PageProductionFragment = {
  id: string
  kind: Types.PageKind
  name: string
  slug: string
  url: string
  app: { id: string }
  pageContentContainer?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
  elements: Array<ElementProductionFragment>
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
      id
    }
    store {
      ...Store
    }
    url
    elements {
      ...Element
    }
  }
  ${StoreFragmentDoc}
  ${ElementFragmentDoc}
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
      id
    }
    store {
      ...Store
    }
    url
    elements {
      ...Element
    }
  }
  ${StoreFragmentDoc}
  ${ElementFragmentDoc}
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
      id
    }
    slug
    store {
      ...Store
    }
    url
    elements {
      ...ElementProduction
    }
  }
  ${StoreFragmentDoc}
  ${ElementProductionFragmentDoc}
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
