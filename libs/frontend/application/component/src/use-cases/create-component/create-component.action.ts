'use server'

import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type { ComponentCreateInput } from '@codelab/shared/abstract/codegen'
import { CreateComponentsDocument } from './create-components.document'

export const createComponentAction = async (input: ComponentCreateInput) =>
  await gqlFetch(CreateComponentsDocument, {
    input,
  })
