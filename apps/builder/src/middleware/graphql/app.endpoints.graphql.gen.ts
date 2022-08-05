import * as Types from '@codelab/shared/abstract/codegen'

import {
  RedirectedAppFragment,
  AppPreviewFragment,
} from '../../../../../libs/shared/abstract/core/src/domain/app/app.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  RedirectedAppFragmentDoc,
  AppPreviewFragmentDoc,
} from '../../../../../libs/shared/abstract/core/src/domain/app/app.fragment.graphql.gen'
export type GetRedirectedAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetRedirectedAppsQuery = { apps: Array<RedirectedAppFragment> }

export type GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type GetAppsQuery = { apps: Array<AppPreviewFragment> }

export const GetRedirectedAppsDocument = gql`
  query GetRedirectedApps($options: AppOptions, $where: AppWhere) {
    apps: apps(options: $options, where: $where) {
      ...RedirectedApp
    }
  }
  ${RedirectedAppFragmentDoc}
`
export const GetAppsDocument = gql`
  query GetApps($options: AppOptions, $where: AppWhere) {
    apps: apps(options: $options, where: $where) {
      ...AppPreview
    }
  }
  ${AppPreviewFragmentDoc}
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
    GetRedirectedApps(
      variables?: GetRedirectedAppsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetRedirectedAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetRedirectedAppsQuery>(
            GetRedirectedAppsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetRedirectedApps',
        'query',
      )
    },
    GetApps(
      variables?: GetAppsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAppsQuery>(GetAppsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetApps',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
