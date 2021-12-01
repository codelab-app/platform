import * as Types from '@codelab/frontend/abstract/codegen'

import {
  TestType_AppType_Fragment,
  TestType_ArrayType_Fragment,
  TestType_ComponentType_Fragment,
  TestType_ElementType_Fragment,
  TestType_EnumType_Fragment,
  TestType_InterfaceType_Fragment,
  TestType_LambdaType_Fragment,
  TestType_MonacoType_Fragment,
  TestType_PageType_Fragment,
  TestType_PrimitiveType_Fragment,
  TestType_ReactNodeType_Fragment,
  TestType_RenderPropsType_Fragment,
  TestType_UnionType_Fragment,
} from '../../../../tests/graphql/TestType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTypeFragmentDoc } from '../../../../tests/graphql/TestType.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput
}>

export type TestDeleteTypeMutation = {
  deleteType?:
    | TestType_AppType_Fragment
    | TestType_ArrayType_Fragment
    | TestType_ComponentType_Fragment
    | TestType_ElementType_Fragment
    | TestType_EnumType_Fragment
    | TestType_InterfaceType_Fragment
    | TestType_LambdaType_Fragment
    | TestType_MonacoType_Fragment
    | TestType_PageType_Fragment
    | TestType_PrimitiveType_Fragment
    | TestType_ReactNodeType_Fragment
    | TestType_RenderPropsType_Fragment
    | TestType_UnionType_Fragment
    | null
    | undefined
}

export const TestDeleteTypeGql = gql`
  mutation TestDeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input) {
      ...TestType
    }
  }
  ${TestTypeFragmentDoc}
`
export type TestDeleteTypeMutationFn = Apollo.MutationFunction<
  TestDeleteTypeMutation,
  TestDeleteTypeMutationVariables
>

/**
 * __useTestDeleteTypeMutation__
 *
 * To run a mutation, you first call `useTestDeleteTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteTypeMutation, { data, loading, error }] = useTestDeleteTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteTypeMutation,
    TestDeleteTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteTypeMutation,
    TestDeleteTypeMutationVariables
  >(TestDeleteTypeGql, options)
}
export type TestDeleteTypeMutationHookResult = ReturnType<
  typeof useTestDeleteTypeMutation
>
export type TestDeleteTypeMutationResult =
  Apollo.MutationResult<TestDeleteTypeMutation>
export type TestDeleteTypeMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteTypeMutation,
  TestDeleteTypeMutationVariables
>
