import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../Atom.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { AtomFragmentDoc } from '../../Atom.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput;
}>;


export type GetAtomQuery = { getAtom?: Types.Maybe<AtomFragment> };


export const GetAtomGql = gql`
    query GetAtom($input: GetAtomInput!) {
  getAtom(input: $input) {
    ...Atom
  }
}
    ${AtomFragmentDoc}`;

/**
 * __useGetAtomQuery__
 *
 * To run a query within a React component, call `useGetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAtomQuery(baseOptions: Apollo.QueryHookOptions<GetAtomQuery, GetAtomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAtomQuery, GetAtomQueryVariables>(GetAtomGql, options);
      }
export function useGetAtomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAtomQuery, GetAtomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAtomQuery, GetAtomQueryVariables>(GetAtomGql, options);
        }
export type GetAtomQueryHookResult = ReturnType<typeof useGetAtomQuery>;
export type GetAtomLazyQueryHookResult = ReturnType<typeof useGetAtomLazyQuery>;
export type GetAtomQueryResult = Apollo.QueryResult<GetAtomQuery, GetAtomQueryVariables>;
export function refetchGetAtomQuery(variables?: GetAtomQueryVariables) {
      return { query: GetAtomGql, variables: variables }
    }