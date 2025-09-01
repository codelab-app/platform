import type { IUpdateActionSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { createActionSchema } from '../create-action'

export const updateActionSchema: IUpdateActionSchemaBuilder = (input) =>
  ({
    ...createActionSchema(input),
    title: 'Update action',
  } as const)
