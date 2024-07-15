'use server'

import type {
  ComponentDeleteInput,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { DeleteComponentsDocument } from './delete-components.document'

export const deleteComponentRepository = (
  where: ComponentWhere,
  $delete?: ComponentDeleteInput,
) => gqlFetch(DeleteComponentsDocument, { delete: $delete, where })
