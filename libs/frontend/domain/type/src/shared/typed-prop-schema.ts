import {
  type ITypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  PropKind,
} from '@codelab/frontend-abstract-domain'
import { GeneralValidationRules } from '@codelab/shared-abstract-core'
import { titleCase } from '@codelab/shared-utils'
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
        uniforms: { component: HiddenField },
      },
      type: {
        default: id,
        enum: [id],
        type: 'string',
        uniforms: { component: HiddenField },
      },
      value: {
        label: fieldName ? titleCase(fieldName) : '',
        ...(uniformSchema?.(type) ?? {}),
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
