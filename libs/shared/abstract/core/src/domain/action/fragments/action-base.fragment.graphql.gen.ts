import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
export type ActionBase_ApiAction_Fragment = { __typename: 'ApiAction', id: string, name: string, type: Types.ActionKind, store: { id: string, name: string } };

export type ActionBase_CodeAction_Fragment = { __typename: 'CodeAction', id: string, name: string, type: Types.ActionKind, store: { id: string, name: string } };

export type ActionBaseFragment = ActionBase_ApiAction_Fragment | ActionBase_CodeAction_Fragment;

export const ActionBaseFragmentDoc = gql`
    fragment ActionBase on ActionBase {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;