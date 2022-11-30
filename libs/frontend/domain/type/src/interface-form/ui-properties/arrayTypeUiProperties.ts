import { IArrayType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/view/components'
import { UiPropertiesFn } from '../types'

export const arrayTypeUiProperties: UiPropertiesFn<IArrayType> = () => {
  return {
    uniforms: {
      component: ToggleExpressionField({
        onToggle: (showExpression, { value, onChange }, lastValue) => {
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
