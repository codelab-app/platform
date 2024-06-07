import type { IArrayTypeModel } from '@codelab/frontend/abstract/domain'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'
import type { UiPropertiesFn } from '../types'

export const arrayTypeUiProperties: UiPropertiesFn<IArrayTypeModel> = (
  type,
  context,
) => {
  return {
    uniforms: {
      component: ToggleExpressionField({
        autocomplete: context?.autocomplete
          ? createAutoCompleteOptions(context.autocomplete)
          : undefined,
        onToggle: (showExpression, { onChange, value }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? `{{${JSON.stringify(value ?? [])}}}`)
          } else {
            onChange(lastValue ?? [])
          }
        },
      }),
    },
  }
}
