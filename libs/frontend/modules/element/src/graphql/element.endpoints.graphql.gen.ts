import * as Types from '@codelab/shared/abstract/codegen'

import {
  ElementGraphFragment,
  ElementFragment,
} from './element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  ElementGraphFragmentDoc,
  ElementFragmentDoc,
} from './element.fragment.graphql.gen'
export type GetElementsGraphQueryVariables = Types.Exact<{
  input: Types.ElementGraphInput
}>

export type GetElementsGraphQuery = { elementGraph: ElementGraphFragment }

export type CreateElementsMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<ElementFragment> }
}

export type DeleteElementsSubgraphMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  delete?: Types.InputMaybe<Types.ElementDeleteInput>
}>

export type DeleteElementsSubgraphMutation = {
  deleteElementsSubgraph: { nodesDeleted: number; deletedIds: Array<string> }
}

export type UpdateElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type UpdateElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type MoveElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type MoveElementsMutation = {
  updateElements: { elements: Array<ElementFragment> }
}

export type GetElementsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type GetElementsQuery = { elements: Array<ElementFragment> }

export const GetElementsGraphDocument = gql`
  query GetElementsGraph($input: ElementGraphInput!) {
    elementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`
export const CreateElementsDocument = gql`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DeleteElementsSubgraphDocument = gql`
  mutation DeleteElementsSubgraph(
    $where: ElementWhere
    $delete: ElementDeleteInput
  ) {
    deleteElementsSubgraph(where: $where, delete: $delete) {
      nodesDeleted
      deletedIds
    }
  }
`
export const UpdateElementsDocument = gql`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const MoveElementsDocument = gql`
  mutation MoveElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementsDocument = gql`
  query GetElements($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
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
    GetElementsGraph(
      variables: GetElementsGraphQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementsGraphQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementsGraphQuery>(
            GetElementsGraphDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetElementsGraph',
        'query',
      )
    },
    CreateElements(
      variables: CreateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    DeleteElementsSubgraph(
      variables?: DeleteElementsSubgraphMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteElementsSubgraphMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementsSubgraphMutation>(
            DeleteElementsSubgraphDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElementsSubgraph',
        'mutation',
      )
    },
    UpdateElements(
      variables?: UpdateElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
      )
    },
    MoveElements(
      variables?: MoveElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<MoveElementsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MoveElementsMutation>(
            MoveElementsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'MoveElements',
        'mutation',
      )
    },
    GetElements(
      variables?: GetElementsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementsQuery>(GetElementsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetElements',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
