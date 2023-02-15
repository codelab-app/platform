import type { IEnumType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/view/components'
import type { UiPropertiesFn } from '../types'

export const enumTypeUiProperties: UiPropertiesFn<IEnumType> = (
  type: IEnumType,
) => {
  return {
    enum: type.allowedValues.map((allowedValue) => allowedValue.value),
    uniforms: {
      options: type.allowedValues.map(({ value, key }) => ({
        value: value,
        label: key,
      })),
      showSearch: true,
      optionFilterProp: 'label',
      getPopupContainer: (triggerNode: Element) => triggerNode.parentElement,
      component: ToggleExpressionField({
        onToggle: (showExpression, { value, field, onChange }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? `{{'${value ?? field.default ?? ''}'}}`)
          } else {
            onChange(lastValue ?? field.default)
          }
        },
      }),
    },
  }
}
