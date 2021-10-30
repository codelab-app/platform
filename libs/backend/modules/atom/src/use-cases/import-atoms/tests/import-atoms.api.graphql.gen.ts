import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput;
}>;


export type TestImportAtomsMutation = { importAtoms?: void | null | undefined };


export const TestImportAtomsGql = `
    mutation TestImportAtoms($input: ImportAtomsInput!) {
  importAtoms(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestImportAtoms(variables: TestImportAtomsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestImportAtomsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestImportAtomsMutation>(TestImportAtomsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestImportAtoms');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;