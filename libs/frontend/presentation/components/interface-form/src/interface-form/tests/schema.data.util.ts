import { PropKind } from '@codelab/frontend-abstract-domain'
import { HiddenField } from 'uniforms-antd'

export const createTypedPropTypeExpectedSchema = (
  kind: string,
  id: string,
) => ({
  isTypedProp: true,
  label: '',
  properties: {
    kind: {
      default: kind,
      enum: [kind],
      type: 'string',
      uniforms: { component: HiddenField },
    },
    propKind: {
      default: PropKind.TypedProp,
      enum: [PropKind.TypedProp],
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
    },
  },
  required: ['type', 'kind', 'value'],
  type: 'object',
})
