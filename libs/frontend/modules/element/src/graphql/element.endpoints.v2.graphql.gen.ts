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

export type DeleteElementsSubgraphMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  delete?: Types.InputMaybe<Types.ElementDeleteInput>
}>

export type DeleteElementsSubgraphMutation = {
  deleteElementsSubgraph: {
    nodesDeleted: number
    deletedIds?: Array<string> | null | undefined
  }
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

export type ConvertElementsToComponentsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElementWhere>
  update?: Types.InputMaybe<Types.ElementUpdateInput>
}>

export type ConvertElementsToComponentsMutation = {
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
export const DeleteElementsSubgraphGql = gql`
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
export const MoveElementsGql = gql`
  mutation MoveElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(where: $where, update: $update) {
      elements {
        ...Element
      }
    }
  }
  ${ElementFragmentDoc}
`
export const ConvertElementsToComponentsGql = gql`
  mutation ConvertElementsToComponents(
    $where: ElementWhere
    $update: ElementUpdateInput
  ) {
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
    DeleteElementsSubgraph: build.mutation<
      DeleteElementsSubgraphMutation,
      | GraphqlOperationOptions<DeleteElementsSubgraphMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: DeleteElementsSubgraphGql,
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
    MoveElements: build.mutation<
      MoveElementsMutation,
      GraphqlOperationOptions<MoveElementsMutationVariables> | void | undefined
    >({
      query: (options) => ({
        document: MoveElementsGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    ConvertElementsToComponents: build.mutation<
      ConvertElementsToComponentsMutation,
      | GraphqlOperationOptions<ConvertElementsToComponentsMutationVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: ConvertElementsToComponentsGql,
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
  useDeleteElementsSubgraphMutation,
  useUpdateElementsMutation,
  useMoveElementsMutation,
  useConvertElementsToComponentsMutation,
  useDuplicateElementMutation,
  useGetElementsQuery,
  useLazyGetElementsQuery,
} = injectedRtkApi
