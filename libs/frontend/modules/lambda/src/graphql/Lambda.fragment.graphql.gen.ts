import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type LambdaFragment = { id: string, name: string, body: string };

export type LambdaPayloadFragment = { payload: string };

export const LambdaFragmentDoc = `
    fragment Lambda on Lambda {
  id
  name
  body
}
    `;
export const LambdaPayloadFragmentDoc = `
    fragment LambdaPayload on LambdaPayload {
  payload
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;