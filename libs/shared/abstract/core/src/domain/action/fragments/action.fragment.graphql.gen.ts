import * as Types from '@codelab/shared/abstract/codegen';

import { ActionBase_CodeAction_Fragment, ActionBase_ApiAction_Fragment } from './action-base.fragment.graphql.gen';
import { CodeActionFragment } from './custom-action.fragment.graphql.gen';
import { ApiActionFragment } from './resource-action.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen';
import { CodeActionFragmentDoc } from './custom-action.fragment.graphql.gen';
import { ApiActionFragmentDoc } from './resource-action.fragment.graphql.gen';
export type Action_CodeAction_Fragment = (
  CodeActionFragment
  & ActionBase_CodeAction_Fragment
);

export type Action_ApiAction_Fragment = (
  ApiActionFragment
  & ActionBase_ApiAction_Fragment
);

export type ActionFragment = Action_CodeAction_Fragment | Action_ApiAction_Fragment;

export const ActionFragmentDoc = gql`
    fragment Action on ActionBase {
  ...ActionBase
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
    ${ActionBaseFragmentDoc}
${CodeActionFragmentDoc}
${ApiActionFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;