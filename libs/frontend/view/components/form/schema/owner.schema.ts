import type { IOwnerSchema } from '@codelab/frontend/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './showFieldOnDev'

export const ownerSchema: PropertiesSchema<IOwnerSchema> = {
  owner: {
    properties: {
      auth0Id: {
        disabled: true,
        type: 'string',
        ...showFieldOnDev(),
      },
    },
    required: ['auth0Id'],
    type: 'object',
  },
}
