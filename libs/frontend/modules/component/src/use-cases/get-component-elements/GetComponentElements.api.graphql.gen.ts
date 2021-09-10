import * as Types from '@codelab/shared/codegen/graphql';

import { ComponentVertexFragment } from '../../../../element/src/graphql/ElementGraph.fragment.api.graphql.gen';
import { ElementFragment } from '../../../../element/src/graphql/Element.fragment.api.graphql.gen';
import { ElementEdgeFragment } from '../../../../element/src/graphql/ElementEdge.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { ComponentVertexFragmentDoc } from '../../../../element/src/graphql/ElementGraph.fragment.api.graphql.gen';
import { ElementFragmentDoc } from '../../../../element/src/graphql/Element.fragment.api.graphql.gen';
import { ElementEdgeFragmentDoc } from '../../../../element/src/graphql/ElementEdge.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetComponentElementsQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type GetComponentElementsQuery = { getComponentElements?: Types.Maybe<{ vertices: Array<ComponentVertexFragment | ElementFragment>, edges: Array<ElementEdgeFragment> }> };


export const GetComponentElementsGql = gql`
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

/**
 * __useGetComponentElementsQuery__
 *
 * To run a query within a React component, call `useGetComponentElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentElementsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetComponentElementsQuery(baseOptions: Apollo.QueryHookOptions<GetComponentElementsQuery, GetComponentElementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComponentElementsQuery, GetComponentElementsQueryVariables>(GetComponentElementsGql, options);
      }
export function useGetComponentElementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComponentElementsQuery, GetComponentElementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComponentElementsQuery, GetComponentElementsQueryVariables>(GetComponentElementsGql, options);
        }
export type GetComponentElementsQueryHookResult = ReturnType<typeof useGetComponentElementsQuery>;
export type GetComponentElementsLazyQueryHookResult = ReturnType<typeof useGetComponentElementsLazyQuery>;
export type GetComponentElementsQueryResult = Apollo.QueryResult<GetComponentElementsQuery, GetComponentElementsQueryVariables>;
export function refetchGetComponentElementsQuery(variables?: GetComponentElementsQueryVariables) {
      return { query: GetComponentElementsGql, variables: variables }
    }