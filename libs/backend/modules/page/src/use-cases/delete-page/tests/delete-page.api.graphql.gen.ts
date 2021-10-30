import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { PageBaseFragmentDoc } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen';
export type TestDeletePageMutationVariables = Types.Exact<{
  input: Types.DeletePageInput;
}>;


export type TestDeletePageMutation = { deletePage?: PageBaseFragment | null | undefined };


export const TestDeletePageGql = `
    mutation TestDeletePage($input: DeletePageInput!) {
  deletePage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestDeletePage(variables: TestDeletePageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestDeletePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestDeletePageMutation>(TestDeletePageGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestDeletePage');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;