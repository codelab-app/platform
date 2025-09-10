import type { IRef } from '@codelab/shared-abstract-core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { showFieldOnDev } from './show-field-on-dev.schema'

export const idSchema: PropertiesSchema<IRef> = {
  id: {
    ...showFieldOnDev(),
    disabled: true,
    type: 'string',
  },
}
