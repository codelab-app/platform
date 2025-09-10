import type { ObjectLike } from '@codelab/shared-abstract-types'

import {
  type ITypeModel,
  type ITypeTransformContext,
  type JsonSchema,
} from '@codelab/frontend-abstract-domain'
import { hiddenField } from '@codelab/frontend-presentation-components-form/schema'
import { GeneralValidationRules } from '@codelab/shared-abstract-core'

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
        ...hiddenField,
      },
      kind: {
        default: kind,
        enum: [kind],
        type: 'string',
        ...hiddenField,
      },
      type: {
        default: id,
        enum: [id],
        type: 'string',
        ...hiddenField,
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
