export const createTypedPropTypeExpectedSchema = (
  kind: string,
  id: string,
) => ({
  label: '',
  properties: {
    kind: {
      default: kind,
      enum: [kind],
      label: 'Kind',
      type: 'string',
      uniforms: expect.any(Object),
    },
    type: {
      default: id,
      enum: [id],
      label: '',
      type: 'string',
      uniforms: expect.any(Object),
    },
    value: {
      label: '',
      oneOf: [{ typeof: 'string' }, { typeof: 'function' }],
      uniforms: expect.any(Object),
    },
  },
  required: ['type', 'kind'],
  type: 'object',
  uniforms: expect.any(Object),
})
