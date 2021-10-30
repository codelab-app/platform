import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from '../../../domain/tag.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagFragmentDoc } from '../../../domain/tag.fragment.graphql.gen';
export type TestGetTagQueryVariables = Types.Exact<{
  input: Types.GetTagInput;
}>;


export type TestGetTagQuery = { getTag?: TestTagFragment | null | undefined };


export const TestGetTagGql = `
    query TestGetTag($input: GetTagInput!) {
  getTag(input: $input) {
    ...TestTag
  }
}
    ${TestTagFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetTag(variables: TestGetTagQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTagQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTagQuery>(TestGetTagGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetTag');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;