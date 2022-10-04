import * as Types from '@codelab/shared/abstract/codegen'

import { ElementFragment } from '../../../../abstract/core/src/domain/element/element.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { ElementFragmentDoc } from '../../../../abstract/core/src/domain/element/element.fragment.graphql.gen'
export type CreateElementsMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<ElementFragment> }
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

export type GetElementTreeQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type GetElementTreeQuery = {
  elementTrees: Array<
    { descendantElements: Array<ElementFragment> } & ElementFragment
  >
}

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
export const DeleteElementsDocument = gql`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(where: $where, delete: $delete) {
      nodesDeleted
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
    elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementTreeDocument = gql`
  query GetElementTree($options: ElementOptions, $where: ElementWhere) {
    elementTrees: elements(options: $options, where: $where) {
      ...Element
      descendantElements {
        ...Element
      }
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
    DeleteElements(
      variables: DeleteElementsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
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
    GetElementTree(
      variables?: GetElementTreeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetElementTreeQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetElementTreeQuery>(
            GetElementTreeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetElementTree',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
