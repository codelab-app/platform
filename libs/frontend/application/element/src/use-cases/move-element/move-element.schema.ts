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
          uniforms: { component: SelectField, options: [] },
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
          uniforms: { component: SelectField, options: [] },

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
