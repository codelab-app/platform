'use server'

import { execute } from '@codelab/frontend/infra/gql'
import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import { CreateAppsMutation } from './create-app.mutation'

export const createAppAction = async (input: AppCreateInput) => {
  return execute(CreateAppsMutation, { input })
}
