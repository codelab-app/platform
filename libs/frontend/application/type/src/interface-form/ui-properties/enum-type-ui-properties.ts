import type { IEnumType } from '@codelab/frontend/abstract/domain'
import {
  createAutoCompleteOptions,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import type { UiPropertiesFn } from '../types'

export const enumTypeUiProperties: UiPropertiesFn<IEnumType> = (
  type: IEnumType,
  context,
) => {
  return {
    enum: type.allowedValues.map((allowedValue) => allowedValue.value),
    uniforms: {
      component: ToggleExpressionField({
        autocomplete: context?.autocomplete
          ? createAutoCompleteOptions(context.autocomplete)
          : undefined,
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
      options: type.allowedValues.map((allowedValue) => ({
        label: allowedValue.key,
        value: allowedValue.value,
      })),
      showSearch: true,
    },
  }
}
