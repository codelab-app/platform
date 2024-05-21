import * as Types from '@codelab/shared/abstract/codegen'

import { ComponentFragment } from '../../../../abstract/domain/src/component/component.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import { ComponentFragmentDoc } from '../../../../abstract/domain/src/component/component.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type CreateComponentsMutationVariables = Types.Exact<{
  input: Array<Types.ComponentCreateInput> | Types.ComponentCreateInput
}>

export type CreateComponentsMutation = {
  createComponents: { components: Array<{ id: string }> }
}

export type DeleteComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  delete?: Types.InputMaybe<Types.ComponentDeleteInput>
}>

export type DeleteComponentsMutation = {
  deleteComponents: { nodesDeleted: number }
}

export type UpdateComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ComponentWhere>
  update?: Types.InputMaybe<Types.ComponentUpdateInput>
}>

export type UpdateComponentsMutation = {
  updateComponents: { components: Array<{ id: string }> }
}

export type GetComponentsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ComponentOptions>
  where?: Types.InputMaybe<Types.ComponentWhere>
}>

export type GetComponentsQuery = {
  aggregate: { count: number }
  items: Array<ComponentFragment>
}

export const CreateComponentsDocument = gql`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        id
      }
    }
  }
`
export const DeleteComponentsDocument = gql`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`
export const UpdateComponentsDocument = gql`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(update: $update, where: $where) {
      components {
        id
      }
    }
  }
`
export const GetComponentsDocument = gql`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    aggregate: componentsAggregate(where: $where) {
      count
    }
    items: components(options: $options, where: $where) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateComponents(
      variables: CreateComponentsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateComponentsMutation>(
            CreateComponentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateComponents',
        'mutation',
        variables,
      )
    },
    DeleteComponents(
      variables?: DeleteComponentsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteComponentsMutation>(
            DeleteComponentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteComponents',
        'mutation',
        variables,
      )
    },
    UpdateComponents(
      variables?: UpdateComponentsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateComponentsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateComponentsMutation>(
            UpdateComponentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateComponents',
        'mutation',
        variables,
      )
    },
    GetComponents(
      variables?: GetComponentsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetComponentsQuery>(GetComponentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetComponents',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
