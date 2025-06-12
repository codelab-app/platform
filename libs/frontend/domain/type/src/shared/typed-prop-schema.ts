import type {
  ITypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend-abstract-domain'

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

  return {
    isTypedProp: true,
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
    required: ['type', 'kind'],
    type: 'object',
  }
}
