import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type ResetDataMutationVariables = Types.Exact<{ [key: string]: never }>

export type ResetDataMutation = { resetData?: void | null | undefined }

export type SeedBaseTypesMutationVariables = Types.Exact<{
  [key: string]: never
}>

export type SeedBaseTypesMutation = { seedBaseTypes?: void | null | undefined }

export type ExecuteCommandMutationVariables = Types.Exact<{
  input: Types.ExecuteCommandInput
}>

export type ExecuteCommandMutation = { executeCommand: { payload: string } }

export const ResetDataGql = gql`
  mutation ResetData {
    resetData
  }
`
export const SeedBaseTypesGql = gql`
  mutation SeedBaseTypes {
    seedBaseTypes
  }
`
export const ExecuteCommandGql = gql`
  mutation executeCommand($input: ExecuteCommandInput!) {
    executeCommand(input: $input) {
      payload
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ResetData: build.mutation<
      ResetDataMutation,
      GraphqlOperationOptions<ResetDataMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: ResetDataGql,
        options: options ?? undefined,
      }),
    }),
    SeedBaseTypes: build.mutation<
      SeedBaseTypesMutation,
      GraphqlOperationOptions<SeedBaseTypesMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: SeedBaseTypesGql,
        options: options ?? undefined,
      }),
    }),
    executeCommand: build.mutation<
      ExecuteCommandMutation,
      GraphqlOperationOptions<ExecuteCommandMutationVariables>
    >({
      query: (options) => ({
        document: ExecuteCommandGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useResetDataMutation,
  useSeedBaseTypesMutation,
  useExecuteCommandMutation,
} = injectedRtkApi
