import * as Types from '@codelab/shared/abstract/codegen';

import { Action_CustomAction_Fragment, Action_PipelineAction_Fragment, Action_ResourceAction_Fragment } from '../action/fragments/action.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionFragmentDoc } from '../action/fragments/action.fragment.graphql.gen';
export type StoreFragment = { id: string, name: string, api: { id: string, name: string }, actions: Array<Action_CustomAction_Fragment | Action_PipelineAction_Fragment | Action_ResourceAction_Fragment> };

export const StoreFragmentDoc = gql`
    fragment Store on Store {
  id
  name
  api {
    id
    name
  }
  actions {
    ...Action
  }
}
    ${ActionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;