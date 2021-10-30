import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../../domain/tag-graph.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagGraphFragmentDoc } from '../../../domain/tag-graph.fragment.graphql.gen';
export type TestGetTagGraphsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestGetTagGraphsQuery = { getTagGraphs: TestTagGraphFragment };


export const TestGetTagGraphsGql = `
    query TestGetTagGraphs {
  getTagGraphs {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestGetTagGraphs(variables?: TestGetTagGraphsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestGetTagGraphsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestGetTagGraphsQuery>(TestGetTagGraphsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestGetTagGraphs');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;