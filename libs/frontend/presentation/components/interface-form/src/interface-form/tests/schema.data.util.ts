import { HiddenField } from 'uniforms-antd'

export const createTypedPropTypeExpectedSchema = (
  kind: string,
  id: string,
) => ({
  isTypedProp: true,
  label: '',
  properties: {
    __isTypedProo: {
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
    },
  },
  required: ['type', 'kind', 'value'],
  type: 'object',
})
