import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type DomainCreatedSubscriptionVariables = Types.Exact<{
  [key: string]: never
}>

export type DomainCreatedSubscription = {
  domainCreated: {
    event: Types.EventType
    timestamp: number
    createdDomain: { name: string; id: string }
  }
}

export const DomainCreatedDocument = gql`
  subscription domainCreated {
    domainCreated {
      createdDomain {
        name
        id
      }
      event
      timestamp
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    domainCreated(
      variables?: DomainCreatedSubscriptionVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DomainCreatedSubscription> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DomainCreatedSubscription>(
            DomainCreatedDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'domainCreated',
        'subscription',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
