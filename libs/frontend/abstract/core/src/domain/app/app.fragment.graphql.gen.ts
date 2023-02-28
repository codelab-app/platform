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
export type AppOwnerFragment = { auth0Id: string }

export type AppPreviewFragment = {
  id: string
  name: string
  slug: string
  owner: AppOwnerFragment
  pages: Array<{ id: string }>
  store: { id: string; name: string }
}

export type AppFragment = {
  id: string
  name: string
  slug: string
  owner: AppOwnerFragment
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
  app: { id: string; owner: AppOwnerFragment }
  pageContentContainer?: { id: string } | null
}

export type PageBuilderAppFragment = {
  id: string
  name: string
  slug: string
  owner: { auth0Id: string }
  pages: Array<BuilderPageFragment>
  store: StoreFragment
}

export const AppOwnerFragmentDoc = gql`
  fragment AppOwner on User {
    auth0Id
  }
`
export const AppPreviewFragmentDoc = gql`
  fragment AppPreview on App {
    id
    name
    slug
    owner {
      ...AppOwner
    }
    pages {
      id
    }
    store {
      id
      name
    }
  }
  ${AppOwnerFragmentDoc}
`
export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    slug
    owner {
      ...AppOwner
    }
    pages {
      ...Page
    }
    store {
      id
    }
  }
  ${AppOwnerFragmentDoc}
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
        ...AppOwner
      }
    }
    pageContentContainer {
      id
    }
    kind
  }
  ${ElementFragmentDoc}
  ${AppOwnerFragmentDoc}
`
export const PageBuilderAppFragmentDoc = gql`
  fragment PageBuilderApp on App {
    id
    name
    slug
    owner {
      auth0Id
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
