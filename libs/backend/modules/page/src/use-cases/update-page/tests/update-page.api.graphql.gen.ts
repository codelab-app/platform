import * as Types from '@codelab/shared/codegen/graphql';

import { PageBaseFragment } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { PageBaseFragmentDoc } from '../../../../../../../frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen';
export type TestUpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput;
}>;


export type TestUpdatePageMutation = { updatePage?: PageBaseFragment | null | undefined };


export const TestUpdatePageGql = `
    mutation TestUpdatePage($input: UpdatePageInput!) {
  updatePage(input: $input) {
    ...PageBase
  }
}
    ${PageBaseFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestUpdatePage(variables: TestUpdatePageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestUpdatePageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestUpdatePageMutation>(TestUpdatePageGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestUpdatePage');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;