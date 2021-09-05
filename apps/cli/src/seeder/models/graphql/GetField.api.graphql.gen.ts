import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_GetFieldQueryVariables = Types.Exact<{
  input: Types.GetFieldInput;
}>;


export type Seeder_GetFieldQuery = { getField?: Types.Maybe<{ id: string }> };


export const Seeder_GetFieldGql = gql`
    query Seeder_GetField($input: GetFieldInput!) {
  getField(input: $input) {
    id
  }
}
    `;

/**
 * __useSeeder_GetFieldQuery__
 *
 * To run a query within a React component, call `useSeeder_GetFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeder_GetFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeder_GetFieldQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_GetFieldQuery(baseOptions: Apollo.QueryHookOptions<Seeder_GetFieldQuery, Seeder_GetFieldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Seeder_GetFieldQuery, Seeder_GetFieldQueryVariables>(Seeder_GetFieldGql, options);
      }
export function useSeeder_GetFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Seeder_GetFieldQuery, Seeder_GetFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Seeder_GetFieldQuery, Seeder_GetFieldQueryVariables>(Seeder_GetFieldGql, options);
        }
export type Seeder_GetFieldQueryHookResult = ReturnType<typeof useSeeder_GetFieldQuery>;
export type Seeder_GetFieldLazyQueryHookResult = ReturnType<typeof useSeeder_GetFieldLazyQuery>;
export type Seeder_GetFieldQueryResult = Apollo.QueryResult<Seeder_GetFieldQuery, Seeder_GetFieldQueryVariables>;
export function refetchSeeder_GetFieldQuery(variables?: Seeder_GetFieldQueryVariables) {
      return { query: Seeder_GetFieldGql, variables: variables }
    }