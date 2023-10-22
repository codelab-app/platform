import type { IRef } from '@codelab/shared/abstract/core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import { showFieldOnDev } from './show-field-on-dev'

export const idSchema = ({
  component,
  label,
}: {
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>
} = {}): PropertiesSchema<IRef> => ({
  id: {
    type: 'string',
    ...(label ? { label } : {}),
    ...showFieldOnDev(),
    disabled: true,
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
