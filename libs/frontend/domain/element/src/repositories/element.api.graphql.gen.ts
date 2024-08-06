import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '@codelab/frontend/infra/gql'

export const CreateElementsDocument = graphql(`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        id
      }
    }
  }
`)

export const DeleteElementsDocument = graphql(`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const UpdateElementsDocument = graphql(`
  mutation UpdateElements($where: ElementWhere, $update: ElementUpdateInput) {
    updateElements(update: $update, where: $where) {
      elements {
        id
      }
    }
  }
`)

export const ElementListDocument = graphql(`
  query ElementList($options: ElementOptions, $where: ElementWhere) {
    aggregate: elementsAggregate(where: $where) {
      count
    }
    items: elements(options: $options, where: $where) {
      ...Element
    }
  }
`)

import {
  type CreateElementsMutationVariables,
  type DeleteElementsMutationVariables,
  type UpdateElementsMutationVariables,
  type ElementListQueryVariables,
} from '@codelab/frontend/infra/gql'

export const CreateElements = (
  variables: CreateElementsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateElementsDocument.toString(), variables, next)

export const DeleteElements = (
  variables: DeleteElementsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteElementsDocument.toString(), variables, next)

export const UpdateElements = (
  variables: UpdateElementsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateElementsDocument.toString(), variables, next)

export const ElementList = (
  variables: ElementListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(ElementListDocument.toString(), variables, next)
