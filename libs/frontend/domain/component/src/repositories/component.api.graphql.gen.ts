import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { ComponentFragmentDoc } from '@codelab/frontend/infra/gql'

export const CreateComponentsDocument = graphql(`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        id
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
import {
  type CreateComponentsMutationVariables,
  type DeleteComponentsMutationVariables,
  type UpdateComponentsMutationVariables,
  type ComponentListQueryVariables,
} from '@codelab/frontend/infra/gql'

const CreateComponents = (
  variables: CreateComponentsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateComponentsDocument, variables, next)

const DeleteComponents = (
  variables: DeleteComponentsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteComponentsDocument, variables, next)

const UpdateComponents = (
  variables: UpdateComponentsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateComponentsDocument, variables, next)

const ComponentList = (
  variables: ComponentListQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(ComponentListDocument, variables, next)

export const getSdk = () => ({
  CreateComponents,
  DeleteComponents,
  UpdateComponents,
  ComponentList,
})
