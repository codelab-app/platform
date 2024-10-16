import type { IOwner } from '@codelab/shared/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { showFieldOnDev } from './show-field-on-dev'

export const ownerSchema: PropertiesSchema<IOwner> = {
  owner: {
    label: '',
    properties: {
      id: {
        label: 'Owner',
        disabled: true,
        type: 'string',
      },
    },
    required: ['id'],
    type: 'object',
    ...showFieldOnDev(),
  },
}
