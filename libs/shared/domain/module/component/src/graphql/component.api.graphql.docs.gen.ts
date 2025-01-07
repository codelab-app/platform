import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { ComponentFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateComponentsDocument = graphql(`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        __typename
        id
        store {
          id
        }
        rootElement {
          id
        }
      }
    }
  }
`)

export const DeleteComponentsDocument = graphql(`
  mutation DeleteComponents(
    $where: ComponentWhere
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const UpdateComponentsDocument = graphql(`
  mutation UpdateComponents(
    $where: ComponentWhere
    $update: ComponentUpdateInput
  ) {
    updateComponents(update: $update, where: $where) {
      components {
        __typename
        id
      }
    }
  }
`)

export const ComponentListDocument = graphql(`
  query ComponentList($options: ComponentOptions, $where: ComponentWhere) {
    aggregate: componentsAggregate(where: $where) {
      count
    }
    items: components(options: $options, where: $where) {
      ...Component
    }
  }
`)
