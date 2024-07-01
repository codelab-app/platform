'use server'

import type { AppCreateInput } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import { CreateAppsMutation } from './create-app.mutation'

export const createAppAction = async (input: AppCreateInput) =>
  await execute(CreateAppsMutation, {
    input,
  })
