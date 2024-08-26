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
    },
    type: {
      default: id,
      enum: [id],
      type: 'string',
    },
    value: {
      label: '',
    },
  },
  required: ['type', 'kind'],
  type: 'object',
})
