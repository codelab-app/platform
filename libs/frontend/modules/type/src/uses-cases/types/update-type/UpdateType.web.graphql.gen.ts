import * as Types from '@codelab/frontend/abstract/codegen'

import { EnumTypeFragment } from '../../../graphql/EnumType.fragment.graphql.gen'
import {
  Type_ArrayType_Fragment,
  Type_ComponentType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from '../../../graphql/Type.fragment.graphql.gen'
import { PrimitiveTypeFragment } from '../../../graphql/PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragment } from '../../../graphql/UnionType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { EnumTypeFragmentDoc } from '../../../graphql/EnumType.fragment.graphql.gen'
import { TypeFragmentDoc } from '../../../graphql/Type.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from '../../../graphql/PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragmentDoc } from '../../../graphql/UnionType.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = {
  updateEnumType?: Types.Maybe<EnumTypeFragment>
}

export type UpdateTypeMutationVariables = Types.Exact<{
  input: Types.UpdateTypeInput
}>

export type UpdateTypeMutation = {
  updateType?: Types.Maybe<
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
  >
}

export type UpdatePrimitiveTypeMutationVariables = Types.Exact<{
  input: Types.UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = {
  updatePrimitiveType?: Types.Maybe<PrimitiveTypeFragment>
}

export type UpdateUnionTypeMutationVariables = Types.Exact<{
  input: Types.UpdateUnionTypeInput
}>

export type UpdateUnionTypeMutation = {
  updateUnionType?: Types.Maybe<UnionTypeFragment>
}

export const UpdateEnumTypeGql = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      ...EnumType
    }
  }
  ${EnumTypeFragmentDoc}
`
export type UpdateEnumTypeMutationFn = Apollo.MutationFunction<
  UpdateEnumTypeMutation,
  UpdateEnumTypeMutationVariables
>

/**
 * __useUpdateEnumTypeMutation__
 *
 * To run a mutation, you first call `useUpdateEnumTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnumTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnumTypeMutation, { data, loading, error }] = useUpdateEnumTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEnumTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEnumTypeMutation,
    UpdateEnumTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateEnumTypeMutation,
    UpdateEnumTypeMutationVariables
  >(UpdateEnumTypeGql, options)
}
export type UpdateEnumTypeMutationHookResult = ReturnType<
  typeof useUpdateEnumTypeMutation
>
export type UpdateEnumTypeMutationResult =
  Apollo.MutationResult<UpdateEnumTypeMutation>
export type UpdateEnumTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEnumTypeMutation,
  UpdateEnumTypeMutationVariables
>
export const UpdateTypeGql = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export type UpdateTypeMutationFn = Apollo.MutationFunction<
  UpdateTypeMutation,
  UpdateTypeMutationVariables
>

/**
 * __useUpdateTypeMutation__
 *
 * To run a mutation, you first call `useUpdateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTypeMutation, { data, loading, error }] = useUpdateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTypeMutation,
    UpdateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateTypeMutation, UpdateTypeMutationVariables>(
    UpdateTypeGql,
    options,
  )
}
export type UpdateTypeMutationHookResult = ReturnType<
  typeof useUpdateTypeMutation
>
export type UpdateTypeMutationResult = Apollo.MutationResult<UpdateTypeMutation>
export type UpdateTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateTypeMutation,
  UpdateTypeMutationVariables
>
export const UpdatePrimitiveTypeGql = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      ...PrimitiveType
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export type UpdatePrimitiveTypeMutationFn = Apollo.MutationFunction<
  UpdatePrimitiveTypeMutation,
  UpdatePrimitiveTypeMutationVariables
>

/**
 * __useUpdatePrimitiveTypeMutation__
 *
 * To run a mutation, you first call `useUpdatePrimitiveTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrimitiveTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrimitiveTypeMutation, { data, loading, error }] = useUpdatePrimitiveTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePrimitiveTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePrimitiveTypeMutation,
    UpdatePrimitiveTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePrimitiveTypeMutation,
    UpdatePrimitiveTypeMutationVariables
  >(UpdatePrimitiveTypeGql, options)
}
export type UpdatePrimitiveTypeMutationHookResult = ReturnType<
  typeof useUpdatePrimitiveTypeMutation
>
export type UpdatePrimitiveTypeMutationResult =
  Apollo.MutationResult<UpdatePrimitiveTypeMutation>
export type UpdatePrimitiveTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdatePrimitiveTypeMutation,
  UpdatePrimitiveTypeMutationVariables
>
export const UpdateUnionTypeGql = gql`
  mutation UpdateUnionType($input: UpdateUnionTypeInput!) {
    updateUnionType(input: $input) {
      ...UnionType
    }
  }
  ${UnionTypeFragmentDoc}
`
export type UpdateUnionTypeMutationFn = Apollo.MutationFunction<
  UpdateUnionTypeMutation,
  UpdateUnionTypeMutationVariables
>

/**
 * __useUpdateUnionTypeMutation__
 *
 * To run a mutation, you first call `useUpdateUnionTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnionTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnionTypeMutation, { data, loading, error }] = useUpdateUnionTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUnionTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUnionTypeMutation,
    UpdateUnionTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUnionTypeMutation,
    UpdateUnionTypeMutationVariables
  >(UpdateUnionTypeGql, options)
}
export type UpdateUnionTypeMutationHookResult = ReturnType<
  typeof useUpdateUnionTypeMutation
>
export type UpdateUnionTypeMutationResult =
  Apollo.MutationResult<UpdateUnionTypeMutation>
export type UpdateUnionTypeMutationOptions = Apollo.BaseMutationOptions<
  UpdateUnionTypeMutation,
  UpdateUnionTypeMutationVariables
>
