import type { IRef } from '@codelab/shared-abstract-core'
import type { JSONSchemaType } from 'ajv'

import { selectField } from './fields'

export const selectFieldSchema = <T extends string>(
  key: T,
  label: string,
  props: Parameters<typeof selectField>[0],
) =>
  ({
    [key]: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          label,
          ...selectField(props),
        },
      },
      required: ['id'],
      label: '',
    },
  } as JSONSchemaType<IRef>['properties'])

export const multiSelectFieldSchema = <T extends string>(
  key: T,
  label: string,
  props: Parameters<typeof selectField>[0],
) =>
  ({
    [key]: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            label,
            ...selectField({
              ...props,
              mode: 'multiple',
            }),
          },
        },
        required: ['id'],
        label: '',
      },
    },
  } as JSONSchemaType<Array<IRef>>['properties'])
