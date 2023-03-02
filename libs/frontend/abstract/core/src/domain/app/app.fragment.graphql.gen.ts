import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import { PageFragment } from '../page/page.fragment.graphql.gen'
import { ElementFragment } from '../element/element.fragment.graphql.gen'
import { StoreFragment } from '../store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import { PageFragmentDoc } from '../page/page.fragment.graphql.gen'
import { ElementFragmentDoc } from '../element/element.fragment.graphql.gen'
import { StoreFragmentDoc } from '../store/store.fragment.graphql.gen'
export type AppPreviewFragment = {
  id: string
  name: string
  slug: string
  owner: OwnerFragment
  pages: Array<{ id: string }>
  store: { id: string; name: string }
}

export type AppFragment = {
  id: string
  name: string
  slug: string
  owner: OwnerFragment
  pages: Array<PageFragment>
  store: { id: string }
}

export type BuilderPageFragment = {
  id: string
  name: string
  slug: string
  getServerSideProps?: string | null
  kind: Types.PageKind
  rootElement: { descendantElements: Array<ElementFragment> } & ElementFragment
  app: { id: string; owner: OwnerFragment }
  pageContentContainer?: { id: string } | null
}

export type PageBuilderAppFragment = {
  id: string
  name: string
  slug: string
  owner: OwnerFragment
  pages: Array<BuilderPageFragment>
  store: StoreFragment
}

export const AppPreviewFragmentDoc = gql`
  fragment AppPreview on App {
    id
    name
    slug
    owner {
      ...Owner
    }
    pages {
      id
    }
    store {
      id
      name
    }
  }
  ${OwnerFragmentDoc}
`
export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    slug
    owner {
      ...Owner
    }
    pages {
      ...Page
    }
    store {
      id
    }
  }
  ${OwnerFragmentDoc}
  ${PageFragmentDoc}
`
export const BuilderPageFragmentDoc = gql`
  fragment BuilderPage on Page {
    id
    name
    slug
    getServerSideProps
    rootElement {
      ...Element
      descendantElements {
        ...Element
      }
    }
    app {
      id
      owner {
        ...Owner
      }
    }
    pageContentContainer {
      id
    }
    kind
  }
  ${ElementFragmentDoc}
  ${OwnerFragmentDoc}
`
export const PageBuilderAppFragmentDoc = gql`
  fragment PageBuilderApp on App {
    id
    name
    slug
    owner {
      ...Owner
    }
    pages(
      where: {
        OR: [
          { id: $pageId }
          { kind: Provider }
          { kind: NotFound }
          { kind: InternalServerError }
        ]
      }
    ) {
      ...BuilderPage
    }
    store {
      ...Store
    }
  }
  ${OwnerFragmentDoc}
  ${BuilderPageFragmentDoc}
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
