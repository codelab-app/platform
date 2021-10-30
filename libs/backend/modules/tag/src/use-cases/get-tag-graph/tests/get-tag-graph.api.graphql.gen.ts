import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../../domain/tag-graph.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagGraphFragmentDoc } from '../../../domain/tag-graph.fragment.graphql.gen';
export type TestGetTagGraphQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagGraphQuery = { getTagGraph?: TestTagGraphFragment | null | undefined };


export const TestGetTagGraphGql = `
    query TestGetTagGraph {
  getTagGraph {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetTagGraph(variables?: TestGetTagGraphQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTagGraphQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTagGraphQuery>(TestGetTagGraphGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetTagGraph');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;