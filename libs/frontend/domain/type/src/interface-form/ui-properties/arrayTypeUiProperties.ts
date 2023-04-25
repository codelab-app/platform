import type { IArrayType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/presentation/view'
import type { UiPropertiesFn } from '../types'

export const arrayTypeUiProperties: UiPropertiesFn<IArrayType> = () => {
  return {
    uniforms: {
      component: ToggleExpressionField({
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
