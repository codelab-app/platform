import * as Types from '@codelab/frontend/abstract/codegen'

import {
  TestType_ArrayType_Fragment,
  TestType_ComponentType_Fragment,
  TestType_ElementType_Fragment,
  TestType_EnumType_Fragment,
  TestType_InterfaceType_Fragment,
  TestType_LambdaType_Fragment,
  TestType_PrimitiveType_Fragment,
  TestType_ReactNodeType_Fragment,
  TestType_RenderPropsType_Fragment,
  TestType_UnionType_Fragment,
} from '../../../../libs/backend/modules/type/src/tests/graphql/TestType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTypeFragmentDoc } from '../../../../libs/backend/modules/type/src/tests/graphql/TestType.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type E2eCreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput
}>

export type E2eCreateTypeMutation = {
  createType:
    | TestType_ArrayType_Fragment
    | TestType_ComponentType_Fragment
    | TestType_ElementType_Fragment
    | TestType_EnumType_Fragment
    | TestType_InterfaceType_Fragment
    | TestType_LambdaType_Fragment
    | TestType_PrimitiveType_Fragment
    | TestType_ReactNodeType_Fragment
    | TestType_RenderPropsType_Fragment
    | TestType_UnionType_Fragment
}

export const E2eCreateTypeGql = gql`
  mutation E2eCreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      ...TestType
    }
  }
  ${TestTypeFragmentDoc}
`
export type E2eCreateTypeMutationFn = Apollo.MutationFunction<
  E2eCreateTypeMutation,
  E2eCreateTypeMutationVariables
>

/**
 * __useE2eCreateTypeMutation__
 *
 * To run a mutation, you first call `useE2eCreateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useE2eCreateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [e2eCreateTypeMutation, { data, loading, error }] = useE2eCreateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useE2eCreateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    E2eCreateTypeMutation,
    E2eCreateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    E2eCreateTypeMutation,
    E2eCreateTypeMutationVariables
  >(E2eCreateTypeGql, options)
}
export type E2eCreateTypeMutationHookResult = ReturnType<
  typeof useE2eCreateTypeMutation
>
export type E2eCreateTypeMutationResult =
  Apollo.MutationResult<E2eCreateTypeMutation>
export type E2eCreateTypeMutationOptions = Apollo.BaseMutationOptions<
  E2eCreateTypeMutation,
  E2eCreateTypeMutationVariables
>
