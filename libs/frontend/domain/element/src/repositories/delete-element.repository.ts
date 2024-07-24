'use server'

import type { DeleteElementsMutationVariables } from '@codelab/frontend/infra/gql'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { elementApi } from './element.api'

export const deleteElementRepository = ({
  delete: $delete = { props: {} },
  where,
}: DeleteElementsMutationVariables) =>
  elementApi.DeleteElements({
    delete: $delete,
    where,
  })
