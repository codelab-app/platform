import * as Types from '@codelab/shared/codegen/graphql';

import { ElementFragment } from './Element.fragment.graphql.gen';
import { ElementEdgeFragment } from './ElementEdge.fragment.graphql.gen';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { ElementFragmentDoc } from './Element.fragment.graphql.gen';
import { ElementEdgeFragmentDoc } from './ElementEdge.fragment.graphql.gen';
export type ComponentVertexFragment = { __typename: 'Component', id: string, name: string };

export type ElementGraphFragment = { vertices: Array<ComponentVertexFragment | ElementFragment>, edges: Array<ElementEdgeFragment> };

export const ComponentVertexFragmentDoc = `
    fragment ComponentVertex on Component {
  __typename
  id
  name
}
    `;
export const ElementGraphFragmentDoc = `
    fragment ElementGraph on ElementGraph {
  vertices {
    ...ComponentVertex
    ...Element
  }
  edges {
    ...ElementEdge
  }
}
    ${ComponentVertexFragmentDoc}
${ElementFragmentDoc}
${ElementEdgeFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;