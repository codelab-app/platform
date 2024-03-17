import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementFragment,
  ElementProductionFragment,
} from '../../../../abstract/domain/src/element/element.fragment.graphql.gen'
import { GraphQLClient, RequestOptions } from 'graphql-request'
import { gql } from 'graphql-tag'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '../../../../abstract/domain/src/element/element.fragment.graphql.gen'
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
export type CreateElementsMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<{ id: string }> }
}

export type DeleteElementsMutationVariables = Types.Exact<{
  where: Types.ElementWhere
  delete?: Types.InputMaybe<Types.ElementDeleteInput>
}>

export type DeleteElementsMutation = {
  deleteElements: { nodesDeleted: number }
}

export type UpdateElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type UpdateElementsMutation = {
  updateElements: { elements: Array<{ id: string }> }
}

export type GetElementsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type GetElementsQuery = {
  aggregate: { count: number }
  items: Array<ElementFragment>
}

export const CreateElementsDocument = gql`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        id
      }
    }
  }
`
export const DeleteElementsDocument = gql`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`
export const UpdateElementsDocument = gql`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(update: $update, where: $where) {
      elements {
        id
      }
    }
  }
`
export const GetElementsDocument = gql`
  query GetElements($options: ElementOptions, $where: ElementWhere) {
    aggregate: elementsAggregate(where: $where) {
      count
    }
    items: elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
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
    CreateElements(
      variables: CreateElementsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateElementsMutation>(
            CreateElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateElements',
        'mutation',
        variables,
      )
    },
    DeleteElements(
      variables: DeleteElementsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementsMutation>(
            DeleteElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElements',
        'mutation',
        variables,
      )
    },
    UpdateElements(
      variables?: UpdateElementsMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<UpdateElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateElementsMutation>(
            UpdateElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateElements',
        'mutation',
        variables,
      )
    },
    GetElements(
      variables?: GetElementsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GetElementsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementsQuery>(GetElementsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetElements',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
