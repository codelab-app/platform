import * as Types from '@codelab/shared/abstract/codegen'

import { OwnerFragment } from '../user/owner.fragment.graphql.gen'
import {
  PageFragment,
  BuilderPageFragment,
  ProductionPageFragment,
} from '../page/page.fragment.graphql.gen'
import { DomainFragment } from '../domain/domain.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen'
import {
  PageFragmentDoc,
  BuilderPageFragmentDoc,
  ProductionPageFragmentDoc,
} from '../page/page.fragment.graphql.gen'
import { DomainFragmentDoc } from '../domain/domain.fragment.graphql.gen'
export type AppPreviewFragment = {
  id: string
  name: string
  slug: string
  styling: Types.StyleType
  owner: OwnerFragment
  pages: Array<{ id: string }>
}

export type AppFragment = {
  id: string
  name: string
  slug: string
  styling: Types.StyleType
  owner: OwnerFragment
  pages: Array<PageFragment>
  domains: Array<DomainFragment>
}

export type PageBuilderAppFragment = {
  id: string
  name: string
  slug: string
  styling: Types.StyleType
  owner: OwnerFragment
  pages: Array<BuilderPageFragment>
}

export type PageAppFragment = {
  id: string
  name: string
  slug: string
  styling: Types.StyleType
  owner: OwnerFragment
  pages: Array<ProductionPageFragment>
}

export const AppPreviewFragmentDoc = gql`
  fragment AppPreview on App {
    id
    name
    slug
    styling
    owner {
      ...Owner
    }
    pages {
      id
    }
  }
  ${OwnerFragmentDoc}
`
export const AppFragmentDoc = gql`
  fragment App on App {
    id
    name
    slug
    styling
    owner {
      ...Owner
    }
    pages {
      ...Page
    }
    domains {
      ...Domain
    }
  }
  ${OwnerFragmentDoc}
  ${PageFragmentDoc}
  ${DomainFragmentDoc}
`
export const PageBuilderAppFragmentDoc = gql`
  fragment PageBuilderApp on App {
    id
    name
    slug
    styling
    owner {
      ...Owner
    }
    pages(
      where: {
        OR: [
          { _compoundName: $pageName }
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
  ${OwnerFragmentDoc}
  ${BuilderPageFragmentDoc}
`
export const PageAppFragmentDoc = gql`
  fragment PageApp on App {
    id
    name
    slug
    styling
    owner {
      ...Owner
    }
    pages(where: { OR: [{ _compoundName: $pageName }, { kind: Provider }] }) {
      ...ProductionPage
    }
  }
  ${OwnerFragmentDoc}
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
