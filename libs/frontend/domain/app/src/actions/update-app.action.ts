'use server'

import type { AppUpdateInput, AppWhere } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import { UpdateAppsMutation } from './update-app.mutation'

export const updateAppAction = async (
  $where: AppWhere,
  $update: AppUpdateInput,
) =>
  await execute(UpdateAppsMutation, {
    update: $update,
    where: $where,
  })
