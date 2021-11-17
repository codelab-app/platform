import * as Types from '@codelab/frontend/abstract/codegen'

import {
  LambdaFragment,
  LambdaPayloadFragment,
} from './Lambda.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  LambdaFragmentDoc,
  LambdaPayloadFragmentDoc,
} from './Lambda.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateLambdaMutationVariables = Types.Exact<{
  input: Types.CreateLambdaInput
}>

export type CreateLambdaMutation = { createLambda: { id: string } }

export type DeleteLambdaMutationVariables = Types.Exact<{
  input: Types.DeleteLambdaInput
}>

export type DeleteLambdaMutation = { deleteLambda: LambdaFragment }

export type ExecuteLambdaMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput
}>

export type ExecuteLambdaMutation = {
  executeLambda?: LambdaPayloadFragment | null | undefined
}

export type GetLambdaQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput
}>

export type GetLambdaQuery = { getLambda?: LambdaFragment | null | undefined }

export type GetLambdasQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetLambdasQuery = { getLambdas: Array<LambdaFragment> }

export type UpdateLambdaMutationVariables = Types.Exact<{
  input: Types.UpdateLambdaInput
}>

export type UpdateLambdaMutation = {
  updateLambda?: LambdaFragment | null | undefined
}

export const CreateLambdaGql = gql`
  mutation CreateLambda($input: CreateLambdaInput!) {
    createLambda(input: $input) {
      id
    }
  }
`
export const DeleteLambdaGql = gql`
  mutation DeleteLambda($input: DeleteLambdaInput!) {
    deleteLambda(input: $input) {
      ...Lambda
    }
  }
  ${LambdaFragmentDoc}
`
export const ExecuteLambdaGql = gql`
  mutation ExecuteLambda($input: ExecuteLambdaInput!) {
    executeLambda(input: $input) {
      ...LambdaPayload
    }
  }
  ${LambdaPayloadFragmentDoc}
`
export const GetLambdaGql = gql`
  query GetLambda($input: GetLambdaInput!) {
    getLambda(input: $input) {
      ...Lambda
    }
  }
  ${LambdaFragmentDoc}
`
export const GetLambdasGql = gql`
  query GetLambdas {
    getLambdas {
      ...Lambda
    }
  }
  ${LambdaFragmentDoc}
`
export const UpdateLambdaGql = gql`
  mutation UpdateLambda($input: UpdateLambdaInput!) {
    updateLambda(input: $input) {
      ...Lambda
    }
  }
  ${LambdaFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateLambda: build.mutation<
      CreateLambdaMutation,
      GraphqlOperationOptions<CreateLambdaMutationVariables>
    >({
      query: (options) => ({
        document: CreateLambdaGql,
        options: options ?? undefined,
      }),
    }),
    DeleteLambda: build.mutation<
      DeleteLambdaMutation,
      GraphqlOperationOptions<DeleteLambdaMutationVariables>
    >({
      query: (options) => ({
        document: DeleteLambdaGql,
        options: options ?? undefined,
      }),
    }),
    ExecuteLambda: build.mutation<
      ExecuteLambdaMutation,
      GraphqlOperationOptions<ExecuteLambdaMutationVariables>
    >({
      query: (options) => ({
        document: ExecuteLambdaGql,
        options: options ?? undefined,
      }),
    }),
    GetLambda: build.query<
      GetLambdaQuery,
      GraphqlOperationOptions<GetLambdaQueryVariables>
    >({
      query: (options) => ({
        document: GetLambdaGql,
        options: options ?? undefined,
      }),
    }),
    GetLambdas: build.query<
      GetLambdasQuery,
      GraphqlOperationOptions<GetLambdasQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetLambdasGql,
        options: options ?? undefined,
      }),
    }),
    UpdateLambda: build.mutation<
      UpdateLambdaMutation,
      GraphqlOperationOptions<UpdateLambdaMutationVariables>
    >({
      query: (options) => ({
        document: UpdateLambdaGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateLambdaMutation,
  useDeleteLambdaMutation,
  useExecuteLambdaMutation,
  useGetLambdaQuery,
  useLazyGetLambdaQuery,
  useGetLambdasQuery,
  useLazyGetLambdasQuery,
  useUpdateLambdaMutation,
} = injectedRtkApi
