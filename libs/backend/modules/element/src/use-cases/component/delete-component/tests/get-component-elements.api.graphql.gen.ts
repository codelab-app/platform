import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestGetComponentElementsQueryVariables = Types.Exact<{
  input: Types.GetComponentInput;
}>;


export type TestGetComponentElementsQuery = { getComponentElements?: { edges: Array<{ order?: number | null | undefined, source: string, target: string }>, vertices: Array<{ id: string, name: string } | { __typename: 'Element', id: string, name: string, css?: string | null | undefined, props: string }> } | null | undefined };


export const TestGetComponentElementsGql = `
    query TestGetComponentElements($input: GetComponentInput!) {
  getComponentElements(input: $input) {
    edges {
      order
      source
      target
    }
    vertices {
      ... on Component {
        id
        name
      }
      ... on Element {
        __typename
        id
        name
        css
        props
      }
    }
  }
}
    `;

/**
 * __useTestGetComponentElementsQuery__
 *
 * To run a query within a React component, call `useTestGetComponentElementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetComponentElementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetComponentElementsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetComponentElementsQuery(baseOptions: Apollo.QueryHookOptions<TestGetComponentElementsQuery, TestGetComponentElementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestGetComponentElementsQuery, TestGetComponentElementsQueryVariables>(TestGetComponentElementsGql, options);
      }
export function useTestGetComponentElementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestGetComponentElementsQuery, TestGetComponentElementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestGetComponentElementsQuery, TestGetComponentElementsQueryVariables>(TestGetComponentElementsGql, options);
        }
export type TestGetComponentElementsQueryHookResult = ReturnType<typeof useTestGetComponentElementsQuery>;
export type TestGetComponentElementsLazyQueryHookResult = ReturnType<typeof useTestGetComponentElementsLazyQuery>;
export type TestGetComponentElementsQueryResult = Apollo.QueryResult<TestGetComponentElementsQuery, TestGetComponentElementsQueryVariables>;
export function refetchTestGetComponentElementsQuery(variables?: TestGetComponentElementsQueryVariables) {
      return { query: TestGetComponentElementsGql, variables: variables }
    }