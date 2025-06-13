import type {
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'

import { HiddenField } from 'uniforms-antd'

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
  const required = validationRules?.general?.nullable === false

  return {
    isTypedProp: true,
    properties: {
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
        label: fieldName ?? '',
        ...(uniformSchema?.(type) ?? {}),
      },
    },
    ...validationRules?.general,
    ...(defaultValues ? { default: defaultValues } : {}),
    label: '',
    required: required ? ['type', 'kind', 'value'] : ['type', 'kind'],
    type: 'object',
  }
}
