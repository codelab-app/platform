import type { IUpdateRedirectSchemaBuilder } from '@codelab/frontend-abstract-domain'

import { createRedirectSchema } from '../create-redirect'

export const updateRedirectSchema: IUpdateRedirectSchemaBuilder = (input) => ({
  ...createRedirectSchema(input),
  title: 'Update Redirect',
})
