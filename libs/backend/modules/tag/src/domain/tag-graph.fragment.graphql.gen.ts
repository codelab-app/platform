import * as Types from '@codelab/shared/codegen/graphql';

import { TestTagFragment } from './tag.fragment.graphql.gen';
import { TestTagEdgeFragment } from './tag-edge.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TestTagFragmentDoc } from './tag.fragment.graphql.gen';
import { TestTagEdgeFragmentDoc } from './tag-edge.fragment.graphql.gen';
export type TestTagGraphFragment = { vertices: Array<TestTagFragment>, edges: Array<TestTagEdgeFragment> };

export const TestTagGraphFragmentDoc = `
    fragment TestTagGraph on TagGraph {
  vertices {
    ...TestTag
  }
  edges {
    ...TestTagEdge
  }
}
    ${TestTagFragmentDoc}
${TestTagEdgeFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;