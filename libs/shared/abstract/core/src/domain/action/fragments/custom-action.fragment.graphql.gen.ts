import * as Types from '@codelab/shared/abstract/codegen';

import { ActionBase_ApiAction_Fragment, ActionBase_CodeAction_Fragment } from './action-base.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
import { ActionBaseFragmentDoc } from './action-base.fragment.graphql.gen';
export type CodeActionFragment = (
  { code: string }
  & ActionBase_CodeAction_Fragment
);

export const CodeActionFragmentDoc = gql`
    fragment CodeAction on CodeAction {
  ...ActionBase
  code
}
    ${ActionBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;