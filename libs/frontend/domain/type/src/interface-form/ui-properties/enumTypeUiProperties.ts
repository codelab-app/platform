import { IEnumType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/view/components'
import { UiPropertiesFn } from '../types'

export const enumTypeUiProperties: UiPropertiesFn<IEnumType> = (
  type: IEnumType,
) => {
  return {
    enum: type.allowedValues.map((v) => v.value),
    uniforms: {
      options: type.allowedValues.map((v) => ({
        value: v.value,
        label: v.key,
      })),
      showSearch: true,
      optionFilterProp: 'label',
      getPopupContainer: (triggerNode: Element) => triggerNode.parentElement,
      component: ToggleExpressionField({
        onToggle: (showExpression, { value, field, onChange }) => {
          if (showExpression) {
            onChange(`{{'${value ?? field.default ?? ''}'}}`)
          } else {
            onChange(field.default)
          }
        },
      }),
    },
  }
}
