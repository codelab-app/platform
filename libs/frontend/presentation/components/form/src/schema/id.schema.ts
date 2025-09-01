import type { IRef } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { showFieldOnDev } from './show-field-on-dev.schema'

export const idSchema = ({
  disabled = true,
  extra,
  label,
  uniforms,
}: {
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uniforms?: { component: React.FunctionComponent<any> } & ObjectLike
  extra?: string
  disabled?: boolean
} = {}): PropertiesSchema<IRef> => ({
  id: {
    ...showFieldOnDev(),
    ...(label ? { label } : {}),
    ...(uniforms ? { uniforms } : {}),
    disabled,
    extra,
    type: 'string',
  },
})
