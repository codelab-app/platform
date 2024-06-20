import * as Types from '@codelab/shared/abstract/codegen';

import { RedirectFragment } from '../../../../abstract/domain/src/redirect/redirect.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { RedirectFragmentDoc } from '../../../../abstract/domain/src/redirect/redirect.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type CreateRedirectsMutationVariables = Types.Exact<{
  input: Array<Types.RedirectCreateInput> | Types.RedirectCreateInput;
}>;


export type CreateRedirectsMutation = { createRedirects: { redirects: Array<{ id: string }> } };

export type DeleteRedirectsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RedirectWhere>;
  delete?: Types.InputMaybe<Types.RedirectDeleteInput>;
}>;


export type DeleteRedirectsMutation = { deleteRedirects: { nodesDeleted: number } };

export type UpdateRedirectsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RedirectWhere>;
  update?: Types.InputMaybe<Types.RedirectUpdateInput>;
}>;


export type UpdateRedirectsMutation = { updateRedirects: { redirects: Array<{ id: string }> } };

export type GetRedirectsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.RedirectOptions>;
  where?: Types.InputMaybe<Types.RedirectWhere>;
}>;


export type GetRedirectsQuery = { aggregate: { count: number }, items: Array<RedirectFragment> };


export const CreateRedirectsDocument = gql`
    mutation CreateRedirects($input: [RedirectCreateInput!]!) {
  createRedirects(input: $input) {
    redirects {
      id
    }
  }
}
    `;
export const DeleteRedirectsDocument = gql`
    mutation DeleteRedirects($where: RedirectWhere, $delete: RedirectDeleteInput) {
  deleteRedirects(delete: $delete, where: $where) {
    nodesDeleted
  }
}
    `;
export const UpdateRedirectsDocument = gql`
    mutation UpdateRedirects($where: RedirectWhere, $update: RedirectUpdateInput) {
  updateRedirects(update: $update, where: $where) {
    redirects {
      id
    }
  }
}
    `;
export const GetRedirectsDocument = gql`
    query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {
  aggregate: redirectsAggregate(where: $where) {
    count
  }
  items: redirects(options: $options, where: $where) {
    ...Redirect
  }
}
    ${RedirectFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateRedirects(variables: CreateRedirectsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateRedirectsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateRedirectsMutation>(CreateRedirectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateRedirects', 'mutation', variables);
    },
    DeleteRedirects(variables?: DeleteRedirectsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteRedirectsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteRedirectsMutation>(DeleteRedirectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteRedirects', 'mutation', variables);
    },
    UpdateRedirects(variables?: UpdateRedirectsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateRedirectsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateRedirectsMutation>(UpdateRedirectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateRedirects', 'mutation', variables);
    },
    GetRedirects(variables?: GetRedirectsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRedirectsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRedirectsQuery>(GetRedirectsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetRedirects', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;