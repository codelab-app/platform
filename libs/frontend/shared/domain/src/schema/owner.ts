import type { IAuth0Owner, IOwnerSchema } from '@codelab/frontend/abstract/core'
import { showFieldOnDev } from '@codelab/frontend/shared/utils'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

export const ownerSchema: PropertiesSchema<IOwnerSchema> = {
  owner: {
    type: 'object',
    properties: {
      auth0Id: {
        type: 'string',
        disabled: true,
        ...showFieldOnDev(),
      },
    },
    required: ['auth0Id'],
  },
}
