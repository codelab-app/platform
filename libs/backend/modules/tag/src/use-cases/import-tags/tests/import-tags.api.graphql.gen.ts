import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestImportTagsMutationVariables = Types.Exact<{
  input: Types.ImportTagsInput;
}>;


export type TestImportTagsMutation = { importTags?: void | null | undefined };


export const TestImportTagsGql = `
    mutation TestImportTags($input: ImportTagsInput!) {
  importTags(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestImportTags(variables: TestImportTagsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestImportTagsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestImportTagsMutation>(TestImportTagsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestImportTags');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;