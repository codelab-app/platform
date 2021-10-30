import * as Types from '@codelab/shared/codegen/graphql';

import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
export type TagGraphFragment = { vertices: Array<TagFragment>, edges: Array<TagEdgeFragment> };

export type TagEdgeFragment = { source: string, target: string };

export type TagFragment = { id: string, name: string };

export const TagFragmentDoc = `
    fragment Tag on Tag {
  id
  name
}
    `;
export const TagEdgeFragmentDoc = `
    fragment TagEdge on TagEdge {
  source
  target
}
    `;
export const TagGraphFragmentDoc = `
    fragment TagGraph on TagGraph {
  vertices {
    ...Tag
  }
  edges {
    ...TagEdge
  }
}
    ${TagFragmentDoc}
${TagEdgeFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;