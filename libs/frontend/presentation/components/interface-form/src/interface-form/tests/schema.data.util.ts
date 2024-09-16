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
      uniforms: { component: null },
    },
    type: {
      default: id,
      enum: [id],
      type: 'string',
      uniforms: { component: null },
    },
    value: {
      label: '',
    },
  },
  required: ['type', 'kind'],
  type: 'object',
})
