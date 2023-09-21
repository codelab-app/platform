import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementFragment,
  ProductionElementFragment,
} from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  ElementFragmentDoc,
  ProductionElementFragmentDoc,
} from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type PagePreviewFragment = {
  id: string
  name: string
  kind: Types.PageKind
  url: string
  app: { id: string }
  rootElement: { id: string }
  store: { id: string }
}

export type PageFragment = {
  id: string
  name: string
  kind: Types.PageKind
  url: string
  app: { id: string }
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  pageContentContainer?: { id: string } | null
  store: StoreFragment
}

export type BuilderPageFragment = {
  id: string
  name: string
  kind: Types.PageKind
  url: string
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  app: { id: string }
  store: StoreFragment
  pageContentContainer?: { id: string } | null
}

export type ProductionPageFragment = {
  id: string
  name: string
  slug: string
  kind: Types.PageKind
  url: string
  rootElement: {
    descendantElements: Array<ProductionElementFragment>
  } & ProductionElementFragment
  app: { id: string }
  store: StoreFragment
  pageContentContainer?: { id: string } | null
}

export const PagePreviewFragmentDoc = gql`
  fragment PagePreview on Page {
    id
    name
    kind
    url
    app {
      id
    }
    rootElement {
      id
    }
    store {
      id
    }
  }
`
export const PageFragmentDoc = gql`
  fragment Page on Page {
    id
    name
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
    store {
      ...Store
    }
    kind
    url
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const BuilderPageFragmentDoc = gql`
  fragment BuilderPage on Page {
    id
    name
    rootElement {
      ...Element
      descendantElements {
        ...Element
      }
    }
    app {
      id
    }
    store {
      ...Store
    }
    pageContentContainer {
      id
    }
    kind
    url
  }
  ${ElementFragmentDoc}
  ${StoreFragmentDoc}
`
export const ProductionPageFragmentDoc = gql`
  fragment ProductionPage on Page {
    id
    name
    slug
    rootElement {
      ...ProductionElement
      descendantElements {
        ...ProductionElement
      }
    }
    app {
      id
    }
    store {
      ...Store
    }
    pageContentContainer {
      id
    }
    kind
    url
  }
  ${ProductionElementFragmentDoc}
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
