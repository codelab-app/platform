import * as Types from '@codelab/shared-infra-gqlgen';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type DomainCreatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type DomainCreatedSubscription = { domainCreated: { event: Types.EventType, timestamp: number, createdDomain: { id: string, name: string } } };

export type DomainUpdatedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type DomainUpdatedSubscription = { domainUpdated: { event: Types.EventType, timestamp: number } };

export type DomainDeletedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type DomainDeletedSubscription = { domainDeleted: { event: Types.EventType, timestamp: number, deletedDomain: { id: string, name: string } } };


export const DomainCreatedDocument = gql`
    subscription DomainCreated {
  domainCreated {
    createdDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `;
export const DomainUpdatedDocument = gql`
    subscription DomainUpdated {
  domainUpdated {
    event
    timestamp
  }
}
    `;
export const DomainDeletedDocument = gql`
    subscription DomainDeleted {
  domainDeleted {
    deletedDomain {
      id
      name
    }
    event
    timestamp
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DomainCreated(variables?: DomainCreatedSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DomainCreatedSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<DomainCreatedSubscription>(DomainCreatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DomainCreated', 'subscription', variables);
    },
    DomainUpdated(variables?: DomainUpdatedSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DomainUpdatedSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<DomainUpdatedSubscription>(DomainUpdatedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DomainUpdated', 'subscription', variables);
    },
    DomainDeleted(variables?: DomainDeletedSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DomainDeletedSubscription> {
      return withWrapper((wrappedRequestHeaders) => client.request<DomainDeletedSubscription>(DomainDeletedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DomainDeleted', 'subscription', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
