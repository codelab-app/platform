import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementFragment,
  ElementProductionFragment,
} from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import {
  Redirect_PageRedirect_Fragment,
  Redirect_UrlRedirect_Fragment,
} from '../redirect/fragments/redirect.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
import { RedirectFragmentDoc } from '../redirect/fragments/redirect.fragment.graphql.gen'
export type PagePreviewFragment = {
  id: string
  kind: Types.PageKind
  name: string
  url: string
  app: { id: string }
  rootElement: { id: string }
  store: { id: string }
  authGuard?: { id: string } | null
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
  authGuard?: { id: string } | null
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
  authGuard?: {
    id: string
    redirect: Redirect_PageRedirect_Fragment | Redirect_UrlRedirect_Fragment
    authGuard: { id: string }
  } | null
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
  authGuard?: { id: string } | null
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
    authGuard {
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
    authGuard {
      id
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
    authGuard {
      id
      redirect {
        ...Redirect
      }
      authGuard {
        id
      }
    }
    url
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
  ${RedirectFragmentDoc}
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
    authGuard {
      id
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
