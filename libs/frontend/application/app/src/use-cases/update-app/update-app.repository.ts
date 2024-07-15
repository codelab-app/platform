'use server'

import {
  graphql,
  type UpdateAppsMutation,
  type UpdateAppsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const UpdateAppsMutation = graphql(`
  mutation UpdateApps($where: AppWhere!, $update: AppUpdateInput!) {
    updateApps(update: $update, where: $where) {
      apps {
        id
      }
    }
  }
`)

export const updateAppRepository = async ({
  update,
  where,
}: UpdateAppsMutationVariables) =>
  await gqlFetch(UpdateAppsMutation, {
    update,
    where,
  })
