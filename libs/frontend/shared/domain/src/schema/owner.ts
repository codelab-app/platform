import type { IOwnerSchema } from '@codelab/frontend/abstract/core'
import { showFieldOnDev } from '@codelab/frontend/shared/utils'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

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
