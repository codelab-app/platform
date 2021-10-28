import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentVertexFragment } from '../../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
import { ElementFragment } from '../../../../element/src/graphql/Element.fragment.graphql.gen';
import { ElementEdgeFragment } from '../../../../element/src/graphql/ElementEdge.fragment.graphql.gen';
import { ComponentVertexFragmentDoc } from '../../../../element/src/graphql/ElementGraph.fragment.graphql.gen';
import { ElementFragmentDoc } from '../../../../element/src/graphql/Element.fragment.graphql.gen';
import { ElementEdgeFragmentDoc } from '../../../../element/src/graphql/ElementEdge.fragment.graphql.gen';
import { api } from '@codelab/frontend/model/infra/api';
export type GetComponentElementsQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type GetComponentElementsQuery = { getComponentElements?: { vertices: Array<ComponentVertexFragment | ElementFragment>, edges: Array<ElementEdgeFragment> } | null | undefined };


export const GetComponentElementsGql = `
    query GetComponentElements($input: GetComponentInput!) {
  getComponentElements(input: $input) {
    vertices {
      ...ComponentVertex
      ...Element
    }
    edges {
      ...ElementEdge
    }
  }
}
    ${ComponentVertexFragmentDoc}
${ElementFragmentDoc}
${ElementEdgeFragmentDoc}`;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    GetComponentElements: build.query<GetComponentElementsQuery, GetComponentElementsQueryVariables>({
      query: (variables) => ({ document: GetComponentElementsGql, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetComponentElementsQuery, useLazyGetComponentElementsQuery } = injectedRtkApi;

