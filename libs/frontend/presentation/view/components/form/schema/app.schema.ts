import type { IAppSchema } from '@codelab/frontend/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './show-field-on-dev'

export const appSchema: PropertiesSchema<IAppSchema> = {
  app: {
    label: '',
    properties: {
      id: {
        label: 'App',
        disabled: true,
        type: 'string',
      },
    },
    required: ['id'],
    type: 'object',
    ...showFieldOnDev(),
  },
}
