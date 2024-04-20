export const createTypedPropTypeExpectedSchema = (
  kind: string,
  id: string,
) => ({
  label: '',
  properties: {
    kind: {
      default: kind,
      enum: [kind],
      type: 'string',
      uniforms: expect.any(Object),
    },
    type: {
      default: id,
      enum: [id],
      type: 'string',
      uniforms: expect.any(Object),
    },
    value: {
      label: '',
      uniforms: expect.any(Object),
    },
  },
  required: ['type', 'kind'],
  type: 'object',
  uniforms: expect.any(Object),
})
