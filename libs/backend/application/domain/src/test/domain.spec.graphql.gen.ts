import * as Types from '@codelab/shared-infra-gqlgen';

import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type TestCreateDomainAppsMutationVariables = Types.Exact<{
  input: Array<Types.AppCreateInput> | Types.AppCreateInput;
}>;


export type TestCreateDomainAppsMutation = { createApps: { apps: Array<{ id: string }> } };

export type TestCreateDomainsMutationVariables = Types.Exact<{
  input: Array<Types.DomainCreateInput> | Types.DomainCreateInput;
}>;


export type TestCreateDomainsMutation = { createDomains: { domains: Array<{ id: string }> } };

export type TestUpdateDomainsMutationVariables = Types.Exact<{
  where: Types.DomainWhere;
  update: Types.DomainUpdateInput;
}>;


export type TestUpdateDomainsMutation = { updateDomains: { domains: Array<{ id: string }> } };

export type TestDeleteDomainsMutationVariables = Types.Exact<{
  where: Types.DomainWhere;
}>;


export type TestDeleteDomainsMutation = { deleteDomains: { nodesDeleted: number } };


export const TestCreateDomainAppsDocument = gql`
    mutation TestCreateDomainApps($input: [AppCreateInput!]!) {
  createApps(input: $input) {
    apps {
      id
    }
  }
}
    `;
export const TestCreateDomainsDocument = gql`
    mutation TestCreateDomains($input: [DomainCreateInput!]!) {
  createDomains(input: $input) {
    domains {
      id
    }
  }
}
    `;
export const TestUpdateDomainsDocument = gql`
    mutation TestUpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
  updateDomains(update: $update, where: $where) {
    domains {
      id
    }
  }
}
    `;
export const TestDeleteDomainsDocument = gql`
    mutation TestDeleteDomains($where: DomainWhere!) {
  deleteDomains(where: $where) {
    nodesDeleted
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestCreateDomainApps(variables: TestCreateDomainAppsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TestCreateDomainAppsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateDomainAppsMutation>(TestCreateDomainAppsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateDomainApps', 'mutation', variables);
    },
    TestCreateDomains(variables: TestCreateDomainsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TestCreateDomainsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestCreateDomainsMutation>(TestCreateDomainsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestCreateDomains', 'mutation', variables);
    },
    TestUpdateDomains(variables: TestUpdateDomainsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TestUpdateDomainsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdateDomainsMutation>(TestUpdateDomainsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdateDomains', 'mutation', variables);
    },
    TestDeleteDomains(variables: TestDeleteDomainsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TestDeleteDomainsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteDomainsMutation>(TestDeleteDomainsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteDomains', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
