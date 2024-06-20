import * as Types from '@codelab/shared/abstract/codegen';

import { AuthGuardFragment } from '../../../../abstract/domain/src/auth-guard/auth-guard.fragment.graphql.gen';
import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-tag';
import { AuthGuardFragmentDoc } from '../../../../abstract/domain/src/auth-guard/auth-guard.fragment.graphql.gen';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
export type GetAuthGuardsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AuthGuardOptions>;
  where?: Types.InputMaybe<Types.AuthGuardWhere>;
}>;


export type GetAuthGuardsQuery = { aggregate: { count: number }, items: Array<AuthGuardFragment> };

export type CreateAuthGuardsMutationVariables = Types.Exact<{
  input: Array<Types.AuthGuardCreateInput> | Types.AuthGuardCreateInput;
}>;


export type CreateAuthGuardsMutation = { createAuthGuards: { authGuards: Array<{ id: string }> } };

export type UpdateAuthGuardMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AuthGuardWhere>;
  update?: Types.InputMaybe<Types.AuthGuardUpdateInput>;
}>;


export type UpdateAuthGuardMutation = { updateAuthGuards: { authGuards: Array<{ id: string }> } };

export type DeleteAuthGuardsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AuthGuardWhere>;
  delete?: Types.InputMaybe<Types.AuthGuardDeleteInput>;
}>;


export type DeleteAuthGuardsMutation = { deleteAuthGuards: { nodesDeleted: number } };


export const GetAuthGuardsDocument = gql`
    query GetAuthGuards($options: AuthGuardOptions, $where: AuthGuardWhere) {
  aggregate: authGuardsAggregate(where: $where) {
    count
  }
  items: authGuards(options: $options, where: $where) {
    ...AuthGuard
  }
}
    ${AuthGuardFragmentDoc}`;
export const CreateAuthGuardsDocument = gql`
    mutation CreateAuthGuards($input: [AuthGuardCreateInput!]!) {
  createAuthGuards(input: $input) {
    authGuards {
      id
    }
  }
}
    `;
export const UpdateAuthGuardDocument = gql`
    mutation UpdateAuthGuard($where: AuthGuardWhere, $update: AuthGuardUpdateInput) {
  updateAuthGuards(update: $update, where: $where) {
    authGuards {
      id
    }
  }
}
    `;
export const DeleteAuthGuardsDocument = gql`
    mutation DeleteAuthGuards($where: AuthGuardWhere, $delete: AuthGuardDeleteInput) {
  deleteAuthGuards(where: $where, delete: $delete) {
    nodesDeleted
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetAuthGuards(variables?: GetAuthGuardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAuthGuardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAuthGuardsQuery>(GetAuthGuardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAuthGuards', 'query', variables);
    },
    CreateAuthGuards(variables: CreateAuthGuardsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAuthGuardsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAuthGuardsMutation>(CreateAuthGuardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAuthGuards', 'mutation', variables);
    },
    UpdateAuthGuard(variables?: UpdateAuthGuardMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateAuthGuardMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAuthGuardMutation>(UpdateAuthGuardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAuthGuard', 'mutation', variables);
    },
    DeleteAuthGuards(variables?: DeleteAuthGuardsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteAuthGuardsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteAuthGuardsMutation>(DeleteAuthGuardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteAuthGuards', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;