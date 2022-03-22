import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type E2eGetPageQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type E2eGetPageQuery = { pages: Array<E2ePageFragment> }

export type E2eCreatePageMutationVariables = Types.Exact<{
  input: Array<Types.PageCreateInput> | Types.PageCreateInput
}>

export type E2eCreatePageMutation = {
  createPages: { pages: Array<E2ePageFragment> }
}

export type E2ePageFragment = {
  id: string
  name: string
  rootElement: { id: string; name?: string | null | undefined }
}

export const E2ePageFragmentDoc = gql`
  fragment E2ePage on Page {
    id
    name
    rootElement {
      id
      name
    }
  }
`
export const E2eGetPageGql = gql`
  query E2eGetPage($where: PageWhere) {
    pages(where: $where) {
      ...E2ePage
    }
  }
  ${E2ePageFragmentDoc}
`
export const E2eCreatePageGql = gql`
  mutation E2eCreatePage($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        ...E2ePage
      }
    }
  }
  ${E2ePageFragmentDoc}
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
  return {
    E2eGetPage(
      variables?: E2eGetPageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eGetPageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eGetPageQuery>(E2eGetPageGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eGetPage',
        'query',
      )
    },
    E2eCreatePage(
      variables: E2eCreatePageMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreatePageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreatePageMutation>(E2eCreatePageGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eCreatePage',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
