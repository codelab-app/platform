import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
export type ActionBase_CustomAction_Fragment = { __typename: 'CustomAction', id: string, name: string, type: Types.ActionKind, runOnInit: boolean };

export type ActionBase_PipelineAction_Fragment = { __typename: 'PipelineAction', id: string, name: string, type: Types.ActionKind, runOnInit: boolean };

export type ActionBase_ResourceAction_Fragment = { __typename: 'ResourceAction', id: string, name: string, type: Types.ActionKind, runOnInit: boolean };

export type ActionBaseFragment = ActionBase_CustomAction_Fragment | ActionBase_PipelineAction_Fragment | ActionBase_ResourceAction_Fragment;

export const ActionBaseFragmentDoc = gql`
    fragment ActionBase on ActionBase {
  __typename
  id
  name
  type
  runOnInit
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;