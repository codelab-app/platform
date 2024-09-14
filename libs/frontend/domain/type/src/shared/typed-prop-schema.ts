import type {
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'

export const typedPropSchema = (
  type: ITypeModel,
  {
    defaultValues,
    fieldName,
    uniformSchema,
    validationRules,
  }: ITypeTransformContext,
): JsonSchema => {
  const { id, kind } = type

  return {
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
        label: fieldName ?? '',
        ...(uniformSchema?.(type) ?? {}),
      },
    },
    ...validationRules?.general,
    ...(defaultValues ? { default: defaultValues } : {}),
    required: ['type', 'kind'],
    type: 'object',
  }
}
