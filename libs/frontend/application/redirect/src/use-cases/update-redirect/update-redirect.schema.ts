import type { IUpdateRedirectData } from '@codelab/frontend/abstract/domain'
import type { JSONSchemaType } from 'ajv'

import { createRedirectSchema } from '../create-redirect'

export const updateRedirectSchema: JSONSchemaType<IUpdateRedirectData> = {
  ...createRedirectSchema,
  title: 'Update Redirect',
}
