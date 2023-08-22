/* eslint-disable react/jsx-props-no-spreading */
import type { IActionType } from '@codelab/frontend/abstract/core'
import {
  createAutoCompleteOptions,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import { SelectAction } from '../fields'
import type { UiPropertiesFn } from '../types'

const ACTION_TEMPLATE = `{{
  function(event) {
    // To access component props use component.[prop-name]
    /* your code here */
  }
}}`

export const actionTypeUiProperties: UiPropertiesFn<IActionType> = (
  type,
  context,
) => {
  return {
    oneOf: [{ typeof: 'string' }, { typeof: 'function' }],
    uniforms: {
      component: ToggleExpressionField({
        autocomplete: context?.autocomplete
          ? createAutoCompleteOptions(context.autocomplete)
          : undefined,
        getBaseControl: (fieldProps) =>
          SelectAction({
            ...fieldProps,
            label: null,
            name: '',
            value: fieldProps.value as string,
          }),
        onToggle: (showExpression, { field, onChange }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? ACTION_TEMPLATE)
          } else {
            onChange(lastValue ?? field.default)
          }
        },
      }),
    },
  }
}
