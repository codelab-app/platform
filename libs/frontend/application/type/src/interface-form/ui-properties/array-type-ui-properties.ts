import type { IArrayType } from '@codelab/frontend/abstract/core'
import {
  createAutoCompleteOptions,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import type { UiPropertiesFn } from '../types'

export const arrayTypeUiProperties: UiPropertiesFn<IArrayType> = (
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
