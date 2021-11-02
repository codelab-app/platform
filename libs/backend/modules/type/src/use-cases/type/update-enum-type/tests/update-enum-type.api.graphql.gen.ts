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
} from '../../../../tests/graphql/TestType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTypeFragmentDoc } from '../../../../tests/graphql/TestType.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput
}>

export type TestUpdateEnumTypeMutation = {
  updateEnumType?: Types.Maybe<TestType_EnumType_Fragment>
}

export const TestUpdateEnumTypeGql = gql`
  mutation TestUpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      ...TestType
    }
  }
  ${TestTypeFragmentDoc}
`
export type TestUpdateEnumTypeMutationFn = Apollo.MutationFunction<
  TestUpdateEnumTypeMutation,
  TestUpdateEnumTypeMutationVariables
>

/**
 * __useTestUpdateEnumTypeMutation__
 *
 * To run a mutation, you first call `useTestUpdateEnumTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateEnumTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateEnumTypeMutation, { data, loading, error }] = useTestUpdateEnumTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateEnumTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdateEnumTypeMutation,
    TestUpdateEnumTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdateEnumTypeMutation,
    TestUpdateEnumTypeMutationVariables
  >(TestUpdateEnumTypeGql, options)
}
export type TestUpdateEnumTypeMutationHookResult = ReturnType<
  typeof useTestUpdateEnumTypeMutation
>
export type TestUpdateEnumTypeMutationResult =
  Apollo.MutationResult<TestUpdateEnumTypeMutation>
export type TestUpdateEnumTypeMutationOptions = Apollo.BaseMutationOptions<
  TestUpdateEnumTypeMutation,
  TestUpdateEnumTypeMutationVariables
>
