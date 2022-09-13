import * as Types from '@codelab/shared/abstract/codegen';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-tag';
export type HookPropFragment = { id: string, data: string };

export type HookFragment = { id: string, type: Types.AtomType, config: HookPropFragment, element: { id: string, name?: string | null } };

export const HookPropFragmentDoc = gql`
    fragment HookProp on Prop {
  id
  data
}
    `;
export const HookFragmentDoc = gql`
    fragment Hook on Hook {
  id
  type
  config {
    ...HookProp
  }
  element {
    id
    name
  }
}
    ${HookPropFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;