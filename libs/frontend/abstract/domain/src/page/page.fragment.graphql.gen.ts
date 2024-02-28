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
  elements: Array<ElementFragment>
  pageContentContainer?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
  redirect?: { id: string } | null
}

export type PageDevelopmentFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  elements: Array<ElementFragment>
  pageContentContainer?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
  redirect?: { id: string } | null
}

export type PageProductionFragment = {
  id: string
  kind: Types.PageKind
  name: string
  slug: string
  url: string
  app: { id: string }
  elements: Array<ElementProductionFragment>
  pageContentContainer?: { id: string } | null
  rootElement: { id: string }
  store: StoreFragment
  redirect?: { id: string } | null
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
    elements {
      ...Element
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
    redirect {
      id
    }
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const PageDevelopmentFragmentDoc = gql`
  fragment PageDevelopment on Page {
    app {
      id
    }
    elements {
      ...Element
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
    redirect {
      id
    }
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const PageProductionFragmentDoc = gql`
  fragment PageProduction on Page {
    app {
      id
    }
    elements {
      ...ElementProduction
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
    redirect {
      id
    }
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
