import type { ObjectLike } from '@codelab/shared-abstract-types'

import { HiddenField } from 'uniforms-antd'

export const createTypedPropTypeExpectedSchema = (
  kind: string,
  uniforms: ObjectLike,
  id: string,
) => ({
  label: '',
  properties: {
    __isTypedProp: {
      default: true,
      type: 'boolean',
      uniforms: { component: HiddenField },
    },
    kind: {
      default: kind,
      enum: [kind],
      type: 'string',
      uniforms: { component: HiddenField },
    },
    type: {
      default: id,
      enum: [id],
      type: 'string',
      uniforms: { component: HiddenField },
    },
    value: {
      label: '',
      type: 'string',
      uniforms,
    },
  },
  required: ['type', 'kind', 'value'],
  type: 'object',
})
