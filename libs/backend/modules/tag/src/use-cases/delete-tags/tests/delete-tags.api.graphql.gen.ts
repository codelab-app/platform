import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TestDeleteTagsMutationVariables = Types.Exact<{
  input: Types.DeleteTagsInput;
}>;


export type TestDeleteTagsMutation = { deleteTags?: void | null | undefined };


export const TestDeleteTagsGql = `
    mutation TestDeleteTags($input: DeleteTagsInput!) {
  deleteTags(input: $input)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeleteTags(variables: TestDeleteTagsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeleteTagsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeleteTagsMutation>(TestDeleteTagsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeleteTags');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;