import * as Types from '@codelab/shared/abstract/codegen';

import { PropFragment, PropMapBindingFragment } from '../prop/prop.fragment.graphql.gen';
import { Action_ApiAction_Fragment, Action_CodeAction_Fragment } from '../action/fragments/action.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionFragmentDoc } from '../action/fragments/action.fragment.graphql.gen';
export type StoreFragment = { id: string, name: string, stateApi: { id: string, name: string }, state: PropFragment, actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment> };

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