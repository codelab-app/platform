import * as Types from '@codelab/frontend/abstract/codegen'

import { PageFullFragment } from '../../../../libs/frontend/modules/page/src/graphql/PageFull.fragment.graphql.gen'
import { PageBaseFragment } from '../../../../libs/frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { PageFullFragmentDoc } from '../../../../libs/frontend/modules/page/src/graphql/PageFull.fragment.graphql.gen'
import { PageBaseFragmentDoc } from '../../../../libs/frontend/modules/page/src/graphql/PageBase.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eGetPageQueryVariables = Types.Exact<{
  input: Types.GetPageInput
}>

export type E2eGetPageQuery = { page?: PageFullFragment | null | undefined }

export type E2eCreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput
}>

export type E2eCreatePageMutation = { createPage: PageBaseFragment }

export const E2eGetPageGql = gql`
  query E2eGetPage($input: GetPageInput!) {
    page: getPage(input: $input) {
      ...PageFull
    }
  }
  ${PageFullFragmentDoc}
`

/**
 * __useE2eGetPageQuery__
 *
 * To run a query within a React component, call `useE2eGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useE2eGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useE2eGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    E2eGetPageQuery,
    E2eGetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<E2eGetPageQuery, E2eGetPageQueryVariables>(
    E2eGetPageGql,
    options,
  )
}
export function useE2eGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    E2eGetPageQuery,
    E2eGetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<E2eGetPageQuery, E2eGetPageQueryVariables>(
    E2eGetPageGql,
    options,
  )
}
export type E2eGetPageQueryHookResult = ReturnType<typeof useE2eGetPageQuery>
export type E2eGetPageLazyQueryHookResult = ReturnType<
  typeof useE2eGetPageLazyQuery
>
export type E2eGetPageQueryResult = Apollo.QueryResult<
  E2eGetPageQuery,
  E2eGetPageQueryVariables
>
export function refetchE2eGetPageQuery(variables: E2eGetPageQueryVariables) {
  return { query: E2eGetPageGql, variables: variables }
}
export const E2eCreatePageGql = gql`
  mutation E2eCreatePage($input: CreatePageInput!) {
    createPage(input: $input) {
      ...PageBase
    }
  }
  ${PageBaseFragmentDoc}
`
export type E2eCreatePageMutationFn = Apollo.MutationFunction<
  E2eCreatePageMutation,
  E2eCreatePageMutationVariables
>

/**
 * __useE2eCreatePageMutation__
 *
 * To run a mutation, you first call `useE2eCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreatePageMutation, { data, loading, error }] = useE2eCreatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreatePageMutation,
    E2eCreatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreatePageMutation,
    E2eCreatePageMutationVariables
  >(E2eCreatePageGql, options)
}
export type E2eCreatePageMutationHookResult = ReturnType<
  typeof useE2eCreatePageMutation
>
export type E2eCreatePageMutationResult =
  Apollo.MutationResult<E2eCreatePageMutation>
export type E2eCreatePageMutationOptions = Apollo.BaseMutationOptions<
  E2eCreatePageMutation,
  E2eCreatePageMutationVariables
>
