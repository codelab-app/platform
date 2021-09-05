import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_GetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput;
}>;


export type Seeder_GetTypeQuery = { getType?: Types.Maybe<{ id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string }> };


export const Seeder_GetTypeGql = gql`
    query Seeder_GetType($input: GetTypeInput!) {
  getType(input: $input) {
    id
  }
}
    `;

/**
 * __useSeeder_GetTypeQuery__
 *
 * To run a query within a React component, call `useSeeder_GetTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeder_GetTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeder_GetTypeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_GetTypeQuery(baseOptions: Apollo.QueryHookOptions<Seeder_GetTypeQuery, Seeder_GetTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Seeder_GetTypeQuery, Seeder_GetTypeQueryVariables>(Seeder_GetTypeGql, options);
      }
export function useSeeder_GetTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Seeder_GetTypeQuery, Seeder_GetTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Seeder_GetTypeQuery, Seeder_GetTypeQueryVariables>(Seeder_GetTypeGql, options);
        }
export type Seeder_GetTypeQueryHookResult = ReturnType<typeof useSeeder_GetTypeQuery>;
export type Seeder_GetTypeLazyQueryHookResult = ReturnType<typeof useSeeder_GetTypeLazyQuery>;
export type Seeder_GetTypeQueryResult = Apollo.QueryResult<Seeder_GetTypeQuery, Seeder_GetTypeQueryVariables>;
export function refetchSeeder_GetTypeQuery(variables?: Seeder_GetTypeQueryVariables) {
      return { query: Seeder_GetTypeGql, variables: variables }
    }