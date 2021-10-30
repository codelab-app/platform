import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestSeedBaseTypesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type TestSeedBaseTypesMutation = { seedBaseTypes?: void | null | undefined };


export const TestSeedBaseTypesGql = `
    mutation TestSeedBaseTypes {
  seedBaseTypes
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestSeedBaseTypes(variables?: TestSeedBaseTypesMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestSeedBaseTypesMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestSeedBaseTypesMutation>(TestSeedBaseTypesGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestSeedBaseTypes');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;