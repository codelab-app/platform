'use server'

import type {
  ComponentDeleteInput,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteComponentsDocument = graphql(`
  mutation DeleteComponents(
    $where: ComponentWhere!
    $delete: ComponentDeleteInput
  ) {
    deleteComponents(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteComponentRepository = (
  where: ComponentWhere,
  $delete?: ComponentDeleteInput,
) => gqlFetch(DeleteComponentsDocument, { delete: $delete, where })
