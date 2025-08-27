import type { ObjectLike } from '@codelab/shared-abstract-types'

import {
  type ITypeModel,
  type ITypeTransformContext,
  type JsonSchema,
} from '@codelab/frontend-abstract-domain'
import { GeneralValidationRules } from '@codelab/shared-abstract-core'
import { HiddenField } from 'uniforms-antd'

export const typedPropSchema = (
  type: ITypeModel,
  uniforms: ObjectLike,
  { defaultValues, validationRules }: ITypeTransformContext,
): JsonSchema => {
  const { id, kind } = type

  return {
    properties: {
      __isTypedProp: {
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
        uniforms,
        type: 'string',
      },
    },
    ...(defaultValues ? { default: defaultValues } : {}),
    label: '',
    required: validationRules?.general?.[GeneralValidationRules.Nullable]
      ? ['type', 'kind']
      : ['type', 'kind', 'value'],
    type: 'object',
  }
}
