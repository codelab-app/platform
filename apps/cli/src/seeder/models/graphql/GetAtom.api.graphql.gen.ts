import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_GetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput;
}>;


export type Seeder_GetAtomQuery = { atom?: Types.Maybe<{ id: string, name: string, type: Types.AtomType, api: { id: string } }> };


export const Seeder_GetAtomGql = gql`
    query Seeder_GetAtom($input: GetAtomInput!) {
  atom: getAtom(input: $input) {
    id
    api {
      id
    }
    name
    type
  }
}
    `;

/**
 * __useSeeder_GetAtomQuery__
 *
 * To run a query within a React component, call `useSeeder_GetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeder_GetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeder_GetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_GetAtomQuery(baseOptions: Apollo.QueryHookOptions<Seeder_GetAtomQuery, Seeder_GetAtomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Seeder_GetAtomQuery, Seeder_GetAtomQueryVariables>(Seeder_GetAtomGql, options);
      }
export function useSeeder_GetAtomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Seeder_GetAtomQuery, Seeder_GetAtomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Seeder_GetAtomQuery, Seeder_GetAtomQueryVariables>(Seeder_GetAtomGql, options);
        }
export type Seeder_GetAtomQueryHookResult = ReturnType<typeof useSeeder_GetAtomQuery>;
export type Seeder_GetAtomLazyQueryHookResult = ReturnType<typeof useSeeder_GetAtomLazyQuery>;
export type Seeder_GetAtomQueryResult = Apollo.QueryResult<Seeder_GetAtomQuery, Seeder_GetAtomQueryVariables>;
export function refetchSeeder_GetAtomQuery(variables?: Seeder_GetAtomQueryVariables) {
      return { query: Seeder_GetAtomGql, variables: variables }
    }