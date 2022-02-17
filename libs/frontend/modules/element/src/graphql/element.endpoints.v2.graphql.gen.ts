import * as Types from '@codelab/shared/abstract/codegen-v2'

import { ElementFragment } from './Element.fragment.v2.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from './Element.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateElementsMutationVariables = Types.Exact<{
  input: Array<Types.ElementCreateInput> | Types.ElementCreateInput
}>

export type CreateElementsMutation = {
  createElements: { elements: Array<ElementFragment> }
}

export type DeleteElementsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
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

export type DuplicateElementMutationVariables = Types.Exact<{
  input: Types.DuplicateElementInput
}>

export type DuplicateElementMutation = {
  duplicateElement: { elements: Array<ElementFragment> }
}

export type GetElementsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ElementOptions>
  where?: Types.InputMaybe<Types.ElementWhere>
}>

export type GetElementsQuery = { elements: Array<ElementFragment> }

export const CreateElementsGql = gql`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DeleteElementsGql = gql`
  mutation DeleteElements($where: ElementWhere, $delete: ElementDeleteInput) {
    deleteElements(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const UpdateElementsGql = gql`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const DuplicateElementGql = gql`
  mutation DuplicateElement($input: DuplicateElementInput!) {
    duplicateElement(input: $input) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const GetElementsGql = gql`
  query GetElements($options: ElementOptions, $where: ElementWhere) {
    elements: elements(options: $options, where: $where) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateElements: build.mutation<
      CreateElementsMutation,
      GraphqlOperationOptions<CreateElementsMutationVariables>
    >({
      query: (options) => ({
        document: CreateElementsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteElements: build.mutation<
      DeleteElementsMutation,
      | GraphqlOperationOptions<DeleteElementsMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: DeleteElementsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdateElements: build.mutation<
      UpdateElementsMutation,
      | GraphqlOperationOptions<UpdateElementsMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: UpdateElementsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DuplicateElement: build.mutation<
      DuplicateElementMutation,
      GraphqlOperationOptions<DuplicateElementMutationVariables>
    >({
      query: (options) => ({
        document: DuplicateElementGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetElements: build.query<
      GetElementsQuery,
      GraphqlOperationOptions<GetElementsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetElementsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateElementsMutation,
  useDeleteElementsMutation,
  useUpdateElementsMutation,
  useDuplicateElementMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
} = injectedRtkApi
