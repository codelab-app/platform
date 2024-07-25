'use server'

import { type UpdatePagesMutationVariables } from '@codelab/frontend/infra/gql'
import { pageApi } from './page.api'

export const updatePageRepository = async ({
  update,
  where,
}: UpdatePagesMutationVariables) => await pageApi.UpdatePages({ update, where })
