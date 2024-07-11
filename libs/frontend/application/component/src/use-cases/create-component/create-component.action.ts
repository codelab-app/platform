'use server'

import { execute } from '@codelab/frontend/infra/gql'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { CreateComponentMutation } from './create-component.mutation'

export const createComponentAction = async (input: ComponentCreateInput) =>
  await execute(CreateComponentMutation, {
    input,
  })
