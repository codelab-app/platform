import * as Types from '@codelab/frontend/abstract/codegen'

import {
  ElementFragment,
  ElementGraphFragment,
} from './Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import {
  ElementFragmentDoc,
  ElementGraphFragmentDoc,
} from './Element.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
export type CreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput
}>

export type CreateElementMutation = { createElement: ElementFragment }

export type DeleteElementMutationVariables = Types.Exact<{
  input: Types.DeleteElementInput
}>

export type DeleteElementMutation = { deleteElement: ElementFragment }

export type GetElementQueryVariables = Types.Exact<{
  input: Types.GetElementInput
}>

export type GetElementQuery = {
  getElement?: ElementFragment | null | undefined
}

export type GetElementGraphQueryVariables = Types.Exact<{
  input: Types.GetElementGraphInput
}>

export type GetElementGraphQuery = { getElementGraph: ElementGraphFragment }

export type MoveElementMutationVariables = Types.Exact<{
  input: Types.MoveElementInput
}>

export type MoveElementMutation = { moveElement: ElementFragment }

export type UpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput
}>

export type UpdateElementMutation = { updateElement: ElementFragment }

export type UpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput
}>

export type UpdateElementPropsMutation = { updateElementProps: ElementFragment }

export type ConvertElementToComponentMutationVariables = Types.Exact<{
  input: Types.ConvertElementToComponentInput
}>

export type ConvertElementToComponentMutation = {
  convertElementToComponent: ElementFragment
}

export const CreateElementGql = gql`
  mutation CreateElement($input: CreateElementInput!) {
    createElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const DeleteElementGql = gql`
  mutation DeleteElement($input: DeleteElementInput!) {
    deleteElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementGql = gql`
  query GetElement($input: GetElementInput!) {
    getElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementGraphGql = gql`
  query GetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`
export const MoveElementGql = gql`
  mutation MoveElement($input: MoveElementInput!) {
    moveElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const UpdateElementGql = gql`
  mutation UpdateElement($input: UpdateElementInput!) {
    updateElement(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const UpdateElementPropsGql = gql`
  mutation UpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const ConvertElementToComponentGql = gql`
  mutation ConvertElementToComponent($input: ConvertElementToComponentInput!) {
    convertElementToComponent(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateElement: build.mutation<
      CreateElementMutation,
      GraphqlOperationOptions<CreateElementMutationVariables>
    >({
      query: (options) => ({
        document: CreateElementGql,
        options: options ?? undefined,
      }),
    }),
    DeleteElement: build.mutation<
      DeleteElementMutation,
      GraphqlOperationOptions<DeleteElementMutationVariables>
    >({
      query: (options) => ({
        document: DeleteElementGql,
        options: options ?? undefined,
      }),
    }),
    GetElement: build.query<
      GetElementQuery,
      GraphqlOperationOptions<GetElementQueryVariables>
    >({
      query: (options) => ({
        document: GetElementGql,
        options: options ?? undefined,
      }),
    }),
    GetElementGraph: build.query<
      GetElementGraphQuery,
      GraphqlOperationOptions<GetElementGraphQueryVariables>
    >({
      query: (options) => ({
        document: GetElementGraphGql,
        options: options ?? undefined,
      }),
    }),
    MoveElement: build.mutation<
      MoveElementMutation,
      GraphqlOperationOptions<MoveElementMutationVariables>
    >({
      query: (options) => ({
        document: MoveElementGql,
        options: options ?? undefined,
      }),
    }),
    UpdateElement: build.mutation<
      UpdateElementMutation,
      GraphqlOperationOptions<UpdateElementMutationVariables>
    >({
      query: (options) => ({
        document: UpdateElementGql,
        options: options ?? undefined,
      }),
    }),
    UpdateElementProps: build.mutation<
      UpdateElementPropsMutation,
      GraphqlOperationOptions<UpdateElementPropsMutationVariables>
    >({
      query: (options) => ({
        document: UpdateElementPropsGql,
        options: options ?? undefined,
      }),
    }),
    ConvertElementToComponent: build.mutation<
      ConvertElementToComponentMutation,
      GraphqlOperationOptions<ConvertElementToComponentMutationVariables>
    >({
      query: (options) => ({
        document: ConvertElementToComponentGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateElementMutation,
  useDeleteElementMutation,
  useGetElementQuery,
  useLazyGetElementQuery,
  useGetElementGraphQuery,
  useLazyGetElementGraphQuery,
  useMoveElementMutation,
  useUpdateElementMutation,
  useUpdateElementPropsMutation,
  useConvertElementToComponentMutation,
} = injectedRtkApi
