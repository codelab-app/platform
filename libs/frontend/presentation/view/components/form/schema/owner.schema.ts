import type { IOwner } from '@codelab/shared/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './showFieldOnDev'

export const ownerSchema: PropertiesSchema<IOwner> = {
  owner: {
    properties: {
      auth0Id: {
        disabled: true,
        type: 'string',
      },
    },
    required: ['auth0Id'],
    type: 'object',
    ...showFieldOnDev(),
  },
}
