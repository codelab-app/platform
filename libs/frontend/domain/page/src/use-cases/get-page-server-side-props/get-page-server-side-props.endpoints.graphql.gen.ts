import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { gql } from 'graphql-tag'
export type GetPageServerSidePropsQueryVariables = Types.Exact<{
  appCompositeKey?: Types.InputMaybe<Types.Scalars['String']['input']>
  pageName?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetPageServerSidePropsQuery = {
  pages: Array<{ id: string; slug: string; getServerSideProps?: string | null }>
}

export const GetPageServerSidePropsDocument = gql`
  query GetPageServerSideProps($appCompositeKey: String, $pageName: String) {
    pages(
      where: {
        app: {
          compositeKey: $appCompositeKey
          compositeKey_ENDS_WITH: $pageName
        }
      }
    ) {
      id
      slug
      getServerSideProps
    }
  }
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
    GetPageServerSideProps(
      variables?: GetPageServerSidePropsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetPageServerSidePropsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPageServerSidePropsQuery>(
            GetPageServerSidePropsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPageServerSideProps',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
