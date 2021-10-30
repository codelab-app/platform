import * as Types from '@codelab/shared/codegen/graphql';

import { TagFragment, TagEdgeFragment } from '../use-cases/Tag.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { TagFragmentDoc, TagEdgeFragmentDoc } from '../use-cases/Tag.fragment.graphql.gen';
export type TagGraphFragment = { vertices: Array<TagFragment>, edges: Array<TagEdgeFragment> };

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