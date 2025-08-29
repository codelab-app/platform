'use client'

import type { MoveData } from '@codelab/frontend-abstract-domain'
import type { JSONSchemaType } from 'ajv'

import { idSchema } from '@codelab/frontend-presentation-components-form/schema'
import { SelectField } from 'uniforms-antd'

export const moveElementSchema: JSONSchemaType<MoveData> = {
  properties: {
    parentElement: {
      properties: {
        ...idSchema({
          label: 'Parent Element',
          component: SelectField,
          disabled: false,
        }),
      },
      required: [],
      type: 'object',
    },
    prevSibling: {
      properties: {
        ...idSchema({
          disabled: false,
          component: SelectField,
          label: 'Prev Sibling',
        }),
      },
      required: [],
      type: 'object',
    },
  },
  required: ['parentElement', 'prevSibling'],
  title: 'Update Element Input',
  type: 'object',
} as const
