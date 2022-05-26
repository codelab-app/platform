import * as Types from '@codelab/shared/abstract/codegen'

import { OperationFragment } from '../../../../../shared/abstract/core/src/domain/operation/operation.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { OperationFragmentDoc } from '../../../../../shared/abstract/core/src/domain/operation/operation.fragment.graphql.gen'
export type GetOperationsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.OperationOptions>
  where?: Types.InputMaybe<Types.OperationWhere>
}>

export type GetOperationsQuery = { operations: Array<OperationFragment> }

export type CreateOperationsMutationVariables = Types.Exact<{
  input: Array<Types.OperationCreateInput> | Types.OperationCreateInput
}>

export type CreateOperationsMutation = {
  createOperations: { operations: Array<OperationFragment> }
}

export type UpdateOperationMutationVariables = Types.Exact<{
  update?: Types.InputMaybe<Types.OperationUpdateInput>
  where?: Types.InputMaybe<Types.OperationWhere>
}>

export type UpdateOperationMutation = {
  updateOperations: { operations: Array<OperationFragment> }
}

export type DeleteOperationsMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.OperationDeleteInput>
  where?: Types.InputMaybe<Types.OperationWhere>
}>

export type DeleteOperationsMutation = {
  deleteOperations: { nodesDeleted: number }
}

export const GetOperationsDocument = gql`
  query GetOperations($options: OperationOptions, $where: OperationWhere) {
    operations(options: $options, where: $where) {
      ...Operation
    }
  }
  ${OperationFragmentDoc}
`
export const CreateOperationsDocument = gql`
  mutation CreateOperations($input: [OperationCreateInput!]!) {
    createOperations(input: $input) {
      operations {
        ...Operation
      }
    }
  }
  ${OperationFragmentDoc}
`
export const UpdateOperationDocument = gql`
  mutation UpdateOperation(
    $update: OperationUpdateInput
    $where: OperationWhere
  ) {
    updateOperations(update: $update, where: $where) {
      operations {
        ...Operation
      }
    }
  }
  ${OperationFragmentDoc}
`
export const DeleteOperationsDocument = gql`
  mutation DeleteOperations(
    $delete: OperationDeleteInput
    $where: OperationWhere
  ) {
    deleteOperations(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetOperations(
      variables?: GetOperationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetOperationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetOperationsQuery>(GetOperationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetOperations',
        'query',
      )
    },
    CreateOperations(
      variables: CreateOperationsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateOperationsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOperationsMutation>(
            CreateOperationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateOperations',
        'mutation',
      )
    },
    UpdateOperation(
      variables?: UpdateOperationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateOperationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateOperationMutation>(
            UpdateOperationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateOperation',
        'mutation',
      )
    },
    DeleteOperations(
      variables?: DeleteOperationsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteOperationsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteOperationsMutation>(
            DeleteOperationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteOperations',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
