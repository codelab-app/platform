'use server'

import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type {
  DeleteElementsMutationVariables,
  ElementDeleteInput,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { IRef } from '@codelab/shared/abstract/core'

const DeleteElementsMutation = graphql(`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteElementRepository = ({
  delete: $delete = { props: {} },
  where,
}: DeleteElementsMutationVariables) =>
  gqlFetch(DeleteElementsMutation, {
    delete: $delete,
    where,
  })
