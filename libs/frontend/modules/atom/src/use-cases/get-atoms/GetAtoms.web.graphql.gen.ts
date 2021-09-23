import * as Types from '@codelab/shared/codegen/graphql';

import { AtomFragment } from '../../Atom.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { AtomFragmentDoc } from '../../Atom.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetAtomsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetAtomsInput>;
}>;


export type GetAtomsQuery = { getAtoms?: Types.Maybe<Array<AtomFragment>> };


export const GetAtomsGql = gql`
    query GetAtoms($input: GetAtomsInput) {
  getAtoms(input: $input) {
    ...Atom
  }
}
    ${AtomFragmentDoc}`;

/**
 * __useGetAtomsQuery__
 *
 * To run a query within a React component, call `useGetAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAtomsQuery(baseOptions?: Apollo.QueryHookOptions<GetAtomsQuery, GetAtomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsGql, options);
      }
export function useGetAtomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAtomsQuery, GetAtomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAtomsQuery, GetAtomsQueryVariables>(GetAtomsGql, options);
        }
export type GetAtomsQueryHookResult = ReturnType<typeof useGetAtomsQuery>;
export type GetAtomsLazyQueryHookResult = ReturnType<typeof useGetAtomsLazyQuery>;
export type GetAtomsQueryResult = Apollo.QueryResult<GetAtomsQuery, GetAtomsQueryVariables>;
export function refetchGetAtomsQuery(variables?: GetAtomsQueryVariables) {
      return { query: GetAtomsGql, variables: variables }
    }