import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from '../../../domain/tag.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagFragmentDoc } from '../../../domain/tag.fragment.graphql.gen';
export type TestGetTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagsQuery = { getTags: Array<TestTagFragment> };


export const TestGetTagsGql = `
    query TestGetTags {
  getTags {
    ...TestTag
  }
}
    ${TestTagFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetTags(variables?: TestGetTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTagsQuery>(TestGetTagsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetTags');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;