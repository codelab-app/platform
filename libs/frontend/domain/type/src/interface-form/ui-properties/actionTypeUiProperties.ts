/* eslint-disable react/jsx-props-no-spreading */
import type { IAnyActionType } from '@codelab/frontend/abstract/core'
import { ToggleExpressionField } from '@codelab/frontend/view/components'
import { SelectAction } from '../fields'
import type { UiPropertiesFn } from '../types'

const ACTION_TEMPLATE = `{{
  function() {
    /* your code here */
  }.bind(this)
}}`

export const actionTypeUiProperties: UiPropertiesFn<IAnyActionType> = () => {
  return {
    oneOf: [{ typeof: 'string' }, { typeof: 'function' }],
    uniforms: {
      component: ToggleExpressionField({
        getBaseControl: () => SelectAction({ label: null, name: 'value' }),
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
