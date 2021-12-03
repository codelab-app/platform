import * as Types from '@codelab/frontend/abstract/codegen'

import {
  AtomBaseFragment,
  AtomFragment,
} from '../../../../libs/frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  AtomBaseFragmentDoc,
  AtomFragmentDoc,
} from '../../../../libs/frontend/modules/atom/src/graphql/Atom.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput
}>

export type E2eCreateAtomMutation = { createAtom: AtomBaseFragment }

export type E2eGetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput
}>

export type E2eGetAtomQuery = { getAtom?: AtomFragment | null | undefined }

export const E2eCreateAtomGql = gql`
  mutation E2eCreateAtom($input: CreateAtomInput!) {
    createAtom(input: $input) {
      ...AtomBase
    }
  }
  ${AtomBaseFragmentDoc}
`
export type E2eCreateAtomMutationFn = Apollo.MutationFunction<
  E2eCreateAtomMutation,
  E2eCreateAtomMutationVariables
>

/**
 * __useE2eCreateAtomMutation__
 *
 * To run a mutation, you first call `useE2eCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateAtomMutation, { data, loading, error }] = useE2eCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateAtomMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateAtomMutation,
    E2eCreateAtomMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateAtomMutation,
    E2eCreateAtomMutationVariables
  >(E2eCreateAtomGql, options)
}
export type E2eCreateAtomMutationHookResult = ReturnType<
  typeof useE2eCreateAtomMutation
>
export type E2eCreateAtomMutationResult =
  Apollo.MutationResult<E2eCreateAtomMutation>
export type E2eCreateAtomMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateAtomMutation,
  E2eCreateAtomMutationVariables
>
export const E2eGetAtomGql = gql`
  query E2eGetAtom($input: GetAtomInput!) {
    getAtom(input: $input) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`

/**
 * __useE2eGetAtomQuery__
 *
 * To run a query within a React component, call `useE2eGetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useE2eGetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useE2eGetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eGetAtomQuery(
  baseOptions: Apollo.QueryHookOptions<
    E2eGetAtomQuery,
    E2eGetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<E2eGetAtomQuery, E2eGetAtomQueryVariables>(
    E2eGetAtomGql,
    options,
  )
}
export function useE2eGetAtomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    E2eGetAtomQuery,
    E2eGetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<E2eGetAtomQuery, E2eGetAtomQueryVariables>(
    E2eGetAtomGql,
    options,
  )
}
export type E2eGetAtomQueryHookResult = ReturnType<typeof useE2eGetAtomQuery>
export type E2eGetAtomLazyQueryHookResult = ReturnType<
  typeof useE2eGetAtomLazyQuery
>
export type E2eGetAtomQueryResult = Apollo.QueryResult<
  E2eGetAtomQuery,
  E2eGetAtomQueryVariables
>
export function refetchE2eGetAtomQuery(variables: E2eGetAtomQueryVariables) {
  return { query: E2eGetAtomGql, variables: variables }
}
