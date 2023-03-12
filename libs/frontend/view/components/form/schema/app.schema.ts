import type { IAppSchema } from '@codelab/frontend/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './showFieldOnDev'

export const appSchema: PropertiesSchema<IAppSchema> = {
  app: {
    properties: {
      id: {
        disabled: true,
        type: 'string',
      },
    },
    required: ['id'],
    type: 'object',
    ...showFieldOnDev(),
  },
}
