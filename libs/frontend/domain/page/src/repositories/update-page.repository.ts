'use server'

import {
  graphql,
  type UpdatePagesMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { pageApi } from './page.api'

export const updatePageRepository = async ({
  update,
  where,
}: UpdatePagesMutationVariables) => await pageApi.UpdatePages({ update, where })
