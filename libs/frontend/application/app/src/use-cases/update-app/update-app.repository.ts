'use server'

import {
  type AppUpdateInput,
  type AppWhere,
  execute,
  graphql,
  type UpdateAppsMutation,
  type UpdateAppsMutationVariables,
} from '@codelab/frontend/infra/gql'

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
  await execute(UpdateAppsMutation, {
    update,
    where,
  })
