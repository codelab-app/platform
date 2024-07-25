'use server'

import type {
  ComponentDeleteInput,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { componentApi } from './component.api'

export const deleteComponentRepository = (
  where: ComponentWhere,
  $delete?: ComponentDeleteInput,
) => componentApi.DeleteComponents({ delete: $delete, where })
