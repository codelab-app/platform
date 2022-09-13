import * as Types from '@codelab/shared/abstract/codegen';

import { HookFragment } from '../../../../../shared/abstract/core/src/domain/hook/hook.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { HookFragmentDoc } from '../../../../../shared/abstract/core/src/domain/hook/hook.fragment.graphql.gen';
export type CreateHooksMutationVariables = Types.Exact<{
  input: Array<Types.HookCreateInput> | Types.HookCreateInput;
}>;


export type CreateHooksMutation = { createHooks: { hooks: Array<HookFragment> } };

export type DeleteHooksMutationVariables = Types.Exact<{
  where: Types.HookWhere;
}>;


export type DeleteHooksMutation = { deleteHooks: { nodesDeleted: number } };


export const CreateHooksDocument = gql`
    mutation CreateHooks($input: [HookCreateInput!]!) {
  createHooks(input: $input) {
    hooks {
      ...Hook
    }
  }
}
    ${HookFragmentDoc}`;
export const DeleteHooksDocument = gql`
    mutation DeleteHooks($where: HookWhere!) {
  deleteHooks(where: $where) {
    nodesDeleted
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateHooks(variables: CreateHooksMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateHooksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateHooksMutation>(CreateHooksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateHooks', 'mutation');
    },
    DeleteHooks(variables: DeleteHooksMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteHooksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteHooksMutation>(DeleteHooksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteHooks', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;