import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type AppFragment = { id: string, ownerId: string, name: string };

export type AppBaseFragment = { id: string, ownerId: string, name: string };

export const AppFragmentDoc = `
    fragment App on App {
  id
  ownerId
  name
}
    `;
export const AppBaseFragmentDoc = `
    fragment AppBase on App {
  id
  ownerId
  name
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;