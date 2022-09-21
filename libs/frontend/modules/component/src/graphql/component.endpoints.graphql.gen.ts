import * as Types from '@codelab/shared/abstract/codegen'

import { RenderedComponentFragment } from '../../../../../shared/abstract/core/src/domain/component/component-render.fragment.graphql.gen'
import { ComponentFragment } from '../../../../../shared/abstract/core/src/domain/component/component.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { RenderedComponentFragmentDoc } from '../../../../../shared/abstract/core/src/domain/component/component-render.fragment.graphql.gen'
import { ComponentFragmentDoc } from '../../../../../shared/abstract/core/src/domain/component/component.fragment.graphql.gen'
export type CreateComponentsMutationVariables = Types.Exact<{
  input: Array<Types.ComponentCreateInput> | Types.ComponentCreateInput
}>

export type CreateComponentsMutation = {
  createComponents: { components: Array<RenderedComponentFragment> }
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
  updateComponents: { components: Array<ComponentFragment> }
}

export type GetComponentsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ComponentOptions>
  where?: Types.InputMaybe<Types.ComponentWhere>
}>

export type GetComponentsQuery = { components: Array<ComponentFragment> }

export const CreateComponentsDocument = gql`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        ...RenderedComponent
      }
    }
  }
  ${RenderedComponentFragmentDoc}
`
export const DeleteComponentsDocument = gql`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdateComponentsDocument = gql`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(where: $where, update: $update) {
      components {
        ...Component
      }
    }
  }
  ${ComponentFragmentDoc}
`
export const GetComponentsDocument = gql`
  query GetComponents($options: ComponentOptions, $where: ComponentWhere) {
    components(options: $options, where: $where) {
      ...Component
    }
  }
  ${ComponentFragmentDoc}
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
    CreateComponents(
      variables: CreateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    DeleteComponents(
      variables?: DeleteComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    UpdateComponents(
      variables?: UpdateComponentsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    GetComponents(
      variables?: GetComponentsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetComponentsQuery>(GetComponentsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetComponents',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
