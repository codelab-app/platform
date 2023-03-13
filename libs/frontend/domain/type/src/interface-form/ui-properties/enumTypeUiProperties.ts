import type { IEnumType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/view/components'
import type { UiPropertiesFn } from '../types'

export const enumTypeUiProperties: UiPropertiesFn<IEnumType> = (
  type: IEnumType,
) => {
  return {
    enum: type.allowedValues.map((allowedValue) => allowedValue.value),
    uniforms: {
      component: ToggleExpressionField({
        onToggle: (showExpression, { field, onChange, value }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? `{{'${value ?? field.default ?? ''}'}}`)
          } else {
            onChange(lastValue ?? field.default)
          }
        },
      }),
      getPopupContainer: (triggerNode: Element) => triggerNode.parentElement,
      optionFilterProp: 'label',
      options: type.allowedValues.map(({ key, value }) => ({
        label: key,
        value: value,
      })),
      showSearch: true,
    },
  }
}
