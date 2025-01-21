import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import {
  ElementFragmentDoc,
  ElementProductionFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

export const CreateElementsDocument = graphql(`
  mutation CreateElements($input: [ElementCreateInput!]!) {
    createElements(input: $input) {
      elements {
        __typename
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
        __typename
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
