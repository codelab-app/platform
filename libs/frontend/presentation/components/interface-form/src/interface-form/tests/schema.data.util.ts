import type { ObjectLike } from '@codelab/shared-abstract-types'

import { hiddenField } from '@codelab/frontend-presentation-components-form/schema'

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
      ...hiddenField,
    },
    kind: {
      default: kind,
      enum: [kind],
      type: 'string',
      ...hiddenField,
    },
    type: {
      default: id,
      enum: [id],
      type: 'string',
      ...hiddenField,
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
