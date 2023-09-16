import * as Types from '@codelab/shared/abstract/codegen'

import {
  PagePreviewFragment,
  PageFragment,
  BuilderPageFragment,
  ProductionPageFragment,
} from '../page/page.fragment.graphql.gen'
import { DomainFragment } from '../domain/domain.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import {
  PagePreviewFragmentDoc,
  PageFragmentDoc,
  BuilderPageFragmentDoc,
  ProductionPageFragmentDoc,
} from '../page/page.fragment.graphql.gen'
import { DomainFragmentDoc } from '../domain/domain.fragment.graphql.gen'
export type AppPreviewFragment = {
  id: string
  name: string
  slug: string
  compositeKey: string
  owner: { auth0Id: string }
  pages: Array<PagePreviewFragment>
}

export type AppFragment = {
  id: string
  name: string
  compositeKey: string
  slug: string
  owner: { auth0Id: string }
  pages: Array<PageFragment>
  domains: Array<DomainFragment>
}

export type PageBuilderAppFragment = {
  id: string
  name: string
  slug: string
  owner: { auth0Id: string }
  pages: Array<BuilderPageFragment>
}

export type PageAppFragment = {
  id: string
  name: string
  slug: string
  owner: { auth0Id: string }
  pages: Array<ProductionPageFragment>
}

export const AppPreviewFragmentDoc = gql`
  fragment AppPreview on App {
    id
    name
    slug
    compositeKey
    owner {
      auth0Id
    }
    pages(where: { kind: Provider }) {
      ...PagePreview
    }
  }
  ${PagePreviewFragmentDoc}
`
export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    compositeKey
    slug
    owner {
      auth0Id
    }
    pages {
      ...Page
    }
    domains {
      ...Domain
    }
  }
  ${PageFragmentDoc}
  ${DomainFragmentDoc}
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
          { _compoundName: $pageCompositeKey }
          { kind: Provider }
          { kind: NotFound }
          { kind: InternalServerError }
          { kind: Regular }
        ]
      }
    ) {
      ...BuilderPage
    }
  }
  ${BuilderPageFragmentDoc}
`
export const PageAppFragmentDoc = gql`
  fragment PageApp on App {
    id
    name
    slug
    owner {
      auth0Id
    }
    pages(
      where: { OR: [{ _compoundName: $pageCompositeKey }, { kind: Provider }] }
    ) {
      ...ProductionPage
    }
  }
  ${ProductionPageFragmentDoc}
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
