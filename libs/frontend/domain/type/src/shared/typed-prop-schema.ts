import type {
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'

export const blankUniforms = { component: () => null }

export const typedPropSchema = (
  { id, kind }: ITypeModel,
  { defaultValues, fieldName, validationRules }: ITypeTransformContext,
): JsonSchema => {
  return {
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
      value: { label: fieldName ?? '' },
    },
    ...validationRules?.general,
    ...(defaultValues ? { default: defaultValues } : {}),
    required: ['type', 'kind'],
    type: 'object',
  }
}
