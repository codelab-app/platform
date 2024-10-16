import type { IAppSchema } from '@codelab/frontend/abstract/domain'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { idSchema } from './id.schema'
import { showFieldOnDev } from './show-field-on-dev'

export const appSchema: PropertiesSchema<IAppSchema> = {
  app: {
    label: 'App Ref',
    properties: {
      ...idSchema(),
    },
    required: ['id'],
    type: 'object',
    ...showFieldOnDev(),
  },
}
