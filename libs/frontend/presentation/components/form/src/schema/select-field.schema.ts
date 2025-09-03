import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { IRef } from '@codelab/shared-abstract-core'
import type { PropertiesSchema } from 'ajv/dist/types/json-schema'
import type { SelectProps } from 'antd'

import { selectField } from './fields'

export const selectFieldSchema = <T extends string>(
  key: string,
  label: string,
  options: Array<SelectOption>,
  mode?: SelectProps['mode'],
) => {
  const properties = {
    [key]: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label,
          ...selectField(options, mode),
        },
      },
      required: ['id'],
      label: '',
    },
    // Cannot use [key: string], otherwise json schema spread won't work
  }

  return properties as unknown as PropertiesSchema<{
    [P in T]: IRef
  }>
}
