import * as Types from '@codelab/shared/abstract/codegen';

import { DomainFragment } from '../domain/domain.fragment.graphql.gen';
import { OwnerFragment } from '../user/owner.fragment.graphql.gen';
import { PagePreviewFragment, PageFragment, PageDevelopmentFragment, PageProductionFragment } from '../page/page.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { DomainFragmentDoc } from '../domain/domain.fragment.graphql.gen';
import { OwnerFragmentDoc } from '../user/owner.fragment.graphql.gen';
import { PagePreviewFragmentDoc, PageFragmentDoc, PageDevelopmentFragmentDoc, PageProductionFragmentDoc } from '../page/page.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type AppPreviewFragment = { id: string, name: string, slug: string, domains: Array<DomainFragment>, owner: OwnerFragment, pages: Array<PagePreviewFragment> };

export type AppFragment = { id: string, name: string, slug: string, domains: Array<DomainFragment>, owner: OwnerFragment, pages: Array<PageFragment> };

export type AppDevelopmentFragment = { id: string, name: string, slug: string, owner: OwnerFragment, pages: Array<PageDevelopmentFragment> };

export type AppProductionFragment = { id: string, name: string, slug: string, owner: OwnerFragment, pages: Array<PageProductionFragment> };

export const AppPreviewFragmentDoc = gql`
    fragment AppPreview on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages(where: {kind: Provider}) {
    ...PagePreview
  }
  slug
}
    ${DomainFragmentDoc}
${OwnerFragmentDoc}
${PagePreviewFragmentDoc}`;
export const AppFragmentDoc = gql`
    fragment App on App {
  domains {
    ...Domain
  }
  id
  name
  owner {
    ...Owner
  }
  pages {
    ...Page
  }
  slug
}
    ${DomainFragmentDoc}
${OwnerFragmentDoc}
${PageFragmentDoc}`;
export const AppDevelopmentFragmentDoc = gql`
    fragment AppDevelopment on App {
  id
  name
  owner {
    ...Owner
  }
  pages(
    where: {OR: [{compositeKey_ENDS_WITH: $pageName}, {kind: Provider}, {kind: NotFound}, {kind: InternalServerError}, {kind: Regular}]}
  ) {
    ...PageDevelopment
  }
  slug
}
    ${OwnerFragmentDoc}
${PageDevelopmentFragmentDoc}`;
export const AppProductionFragmentDoc = gql`
    fragment AppProduction on App {
  id
  name
  owner {
    ...Owner
  }
  pages(where: {OR: [{urlPattern: $pageUrlPattern}, {kind: Provider}]}) {
    ...PageProduction
  }
  slug
}
    ${OwnerFragmentDoc}
${PageProductionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;