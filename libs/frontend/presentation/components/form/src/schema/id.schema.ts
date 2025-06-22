import type { IRef } from '@codelab/shared-abstract-core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'

import { showFieldOnDev } from './show-field-on-dev'

export const idSchema = ({
  component,
  disabled = true,
  help,
  label,
}: {
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>
  help?: string
  disabled?: boolean
} = {}): PropertiesSchema<IRef> => ({
  id: {
    help,
    type: 'string',
    ...(label ? { label } : {}),
    ...showFieldOnDev(),
    disabled,
    required: ['id'],
    ...(component
      ? {
          uniforms: {
            component,
          },
        }
      : {}),
  },
})

export const nullableIdSchema = ({
  component,
  disabled = true,
  help,
  label,
}: {
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>
  help?: string
  disabled?: boolean
} = {}): PropertiesSchema<IRef> => ({
  id: {
    help,
    type: 'string',
    ...(label ? { label } : {}),
    ...showFieldOnDev(),
    disabled,
    ...(component
      ? {
          uniforms: {
            component,
          },
        }
      : {}),
  },
})
