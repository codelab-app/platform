import * as Types from '@codelab/frontend/abstract/codegen'

import { TestElementFragment } from '../../../../libs/backend/modules/element/src/test/graphql/TestElement.fragment.graphql.gen'
import { TestElementGraphFragment } from '../../../../libs/backend/modules/element/src/test/graphql/TestElementGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestElementFragmentDoc } from '../../../../libs/backend/modules/element/src/test/graphql/TestElement.fragment.graphql.gen'
import { TestElementGraphFragmentDoc } from '../../../../libs/backend/modules/element/src/test/graphql/TestElementGraph.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput
}>

export type E2eCreateElementMutation = { createElement: TestElementFragment }

export type E2eUpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput
}>

export type E2eUpdateElementPropsMutation = {
  updateElementProps: TestElementFragment
}

export type E2eUpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput
}>

export type E2eUpdateElementMutation = { updateElement: TestElementFragment }

export type E2eGetElementGraphQueryVariables = Types.Exact<{
  input: Types.GetElementGraphInput
}>

export type E2eGetElementGraphQuery = {
  getElementGraph: TestElementGraphFragment
}

export type E2eCreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput
}>

export type E2eCreatePropMapBindingMutation = {
  createPropMapBinding: { id: string }
}

export const E2eCreateElementGql = gql`
  mutation E2eCreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      ...TestElement
    }
  }
  ${TestElementFragmentDoc}
`
export type E2eCreateElementMutationFn = Apollo.MutationFunction<
  E2eCreateElementMutation,
  E2eCreateElementMutationVariables
>

/**
 * __useE2eCreateElementMutation__
 *
 * To run a mutation, you first call `useE2eCreateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateElementMutation, { data, loading, error }] = useE2eCreateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateElementMutation,
    E2eCreateElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateElementMutation,
    E2eCreateElementMutationVariables
  >(E2eCreateElementGql, options)
}
export type E2eCreateElementMutationHookResult = ReturnType<
  typeof useE2eCreateElementMutation
>
export type E2eCreateElementMutationResult =
  Apollo.MutationResult<E2eCreateElementMutation>
export type E2eCreateElementMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateElementMutation,
  E2eCreateElementMutationVariables
>
export const E2eUpdateElementPropsGql = gql`
  mutation E2eUpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input) {
      ...TestElement
    }
  }
  ${TestElementFragmentDoc}
`
export type E2eUpdateElementPropsMutationFn = Apollo.MutationFunction<
  E2eUpdateElementPropsMutation,
  E2eUpdateElementPropsMutationVariables
>

/**
 * __useE2eUpdateElementPropsMutation__
 *
 * To run a mutation, you first call `useE2eUpdateElementPropsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eUpdateElementPropsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eUpdateElementPropsMutation, { data, loading, error }] = useE2eUpdateElementPropsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eUpdateElementPropsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eUpdateElementPropsMutation,
    E2eUpdateElementPropsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eUpdateElementPropsMutation,
    E2eUpdateElementPropsMutationVariables
  >(E2eUpdateElementPropsGql, options)
}
export type E2eUpdateElementPropsMutationHookResult = ReturnType<
  typeof useE2eUpdateElementPropsMutation
>
export type E2eUpdateElementPropsMutationResult =
  Apollo.MutationResult<E2eUpdateElementPropsMutation>
export type E2eUpdateElementPropsMutationOptions = Apollo.BaseMutationOptions<
  E2eUpdateElementPropsMutation,
  E2eUpdateElementPropsMutationVariables
>
export const E2eUpdateElementGql = gql`
  mutation E2eUpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      ...TestElement
    }
  }
  ${TestElementFragmentDoc}
`
export type E2eUpdateElementMutationFn = Apollo.MutationFunction<
  E2eUpdateElementMutation,
  E2eUpdateElementMutationVariables
>

/**
 * __useE2eUpdateElementMutation__
 *
 * To run a mutation, you first call `useE2eUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eUpdateElementMutation, { data, loading, error }] = useE2eUpdateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eUpdateElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eUpdateElementMutation,
    E2eUpdateElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eUpdateElementMutation,
    E2eUpdateElementMutationVariables
  >(E2eUpdateElementGql, options)
}
export type E2eUpdateElementMutationHookResult = ReturnType<
  typeof useE2eUpdateElementMutation
>
export type E2eUpdateElementMutationResult =
  Apollo.MutationResult<E2eUpdateElementMutation>
export type E2eUpdateElementMutationOptions = Apollo.BaseMutationOptions<
  E2eUpdateElementMutation,
  E2eUpdateElementMutationVariables
>
export const E2eGetElementGraphGql = gql`
  query E2eGetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      ...TestElementGraph
    }
  }
  ${TestElementGraphFragmentDoc}
`

/**
 * __useE2eGetElementGraphQuery__
 *
 * To run a query within a React component, call `useE2eGetElementGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useE2eGetElementGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useE2eGetElementGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eGetElementGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    E2eGetElementGraphQuery,
    E2eGetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    E2eGetElementGraphQuery,
    E2eGetElementGraphQueryVariables
  >(E2eGetElementGraphGql, options)
}
export function useE2eGetElementGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    E2eGetElementGraphQuery,
    E2eGetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    E2eGetElementGraphQuery,
    E2eGetElementGraphQueryVariables
  >(E2eGetElementGraphGql, options)
}
export type E2eGetElementGraphQueryHookResult = ReturnType<
  typeof useE2eGetElementGraphQuery
>
export type E2eGetElementGraphLazyQueryHookResult = ReturnType<
  typeof useE2eGetElementGraphLazyQuery
>
export type E2eGetElementGraphQueryResult = Apollo.QueryResult<
  E2eGetElementGraphQuery,
  E2eGetElementGraphQueryVariables
>
export function refetchE2eGetElementGraphQuery(
  variables: E2eGetElementGraphQueryVariables,
) {
  return { query: E2eGetElementGraphGql, variables: variables }
}
export const E2eCreatePropMapBindingGql = gql`
  mutation E2eCreatePropMapBinding($input: CreatePropMapBindingInput!) {
    createPropMapBinding(input: $input) {
      id
    }
  }
`
export type E2eCreatePropMapBindingMutationFn = Apollo.MutationFunction<
  E2eCreatePropMapBindingMutation,
  E2eCreatePropMapBindingMutationVariables
>

/**
 * __useE2eCreatePropMapBindingMutation__
 *
 * To run a mutation, you first call `useE2eCreatePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreatePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreatePropMapBindingMutation, { data, loading, error }] = useE2eCreatePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreatePropMapBindingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreatePropMapBindingMutation,
    E2eCreatePropMapBindingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreatePropMapBindingMutation,
    E2eCreatePropMapBindingMutationVariables
  >(E2eCreatePropMapBindingGql, options)
}
export type E2eCreatePropMapBindingMutationHookResult = ReturnType<
  typeof useE2eCreatePropMapBindingMutation
>
export type E2eCreatePropMapBindingMutationResult =
  Apollo.MutationResult<E2eCreatePropMapBindingMutation>
export type E2eCreatePropMapBindingMutationOptions = Apollo.BaseMutationOptions<
  E2eCreatePropMapBindingMutation,
  E2eCreatePropMapBindingMutationVariables
>
