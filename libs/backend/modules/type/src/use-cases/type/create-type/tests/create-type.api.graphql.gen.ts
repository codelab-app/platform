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
export type TestCreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput
}>

export type TestCreateTypeMutation = {
  createType:
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
}

export const TestCreateTypeGql = gql`
  mutation TestCreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      ...TestType
    }
  }
  ${TestTypeFragmentDoc}
`
export type TestCreateTypeMutationFn = Apollo.MutationFunction<
  TestCreateTypeMutation,
  TestCreateTypeMutationVariables
>

/**
 * __useTestCreateTypeMutation__
 *
 * To run a mutation, you first call `useTestCreateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateTypeMutation, { data, loading, error }] = useTestCreateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreateTypeMutation,
    TestCreateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreateTypeMutation,
    TestCreateTypeMutationVariables
  >(TestCreateTypeGql, options)
}
export type TestCreateTypeMutationHookResult = ReturnType<
  typeof useTestCreateTypeMutation
>
export type TestCreateTypeMutationResult =
  Apollo.MutationResult<TestCreateTypeMutation>
export type TestCreateTypeMutationOptions = Apollo.BaseMutationOptions<
  TestCreateTypeMutation,
  TestCreateTypeMutationVariables
>
