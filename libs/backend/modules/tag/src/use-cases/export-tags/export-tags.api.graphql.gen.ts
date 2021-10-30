import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagGraphFragment } from '../../domain/tag-graph.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagGraphFragmentDoc } from '../../domain/tag-graph.fragment.graphql.gen';
export type TestExportTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TestExportTagsQuery = { getTagGraphs: TestTagGraphFragment };


export const TestExportTagsGql = `
    query TestExportTags {
  getTagGraphs {
    ...TestTagGraph
  }
}
    ${TestTagGraphFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TestExportTags(variables?: TestExportTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestExportTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestExportTagsQuery>(TestExportTagsGql, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TestExportTags');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;