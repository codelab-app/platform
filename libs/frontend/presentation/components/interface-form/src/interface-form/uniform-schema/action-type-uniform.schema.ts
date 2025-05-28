import type { IActionTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'

import { SelectActionField } from '../fields'

const ACTION_TEMPLATE = `{{
  function(event) {
    // To access component props use component.[prop-name]
    /* your code here */
  }
}}`

export const actionTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IActionTypeModel
> = (type, autocomplete) => ({
  uniforms: {
    component: ToggleExpressionField({
      autocomplete: autocomplete,
      getBaseControl: (fieldProps) =>
        SelectActionField(fieldProps as SelectFieldProps) as React.ReactNode,
      onToggle: (showExpression, { field, onChange }, lastValue) => {
        if (showExpression) {
          onChange(lastValue ?? ACTION_TEMPLATE)
        } else {
          onChange(lastValue ?? field.default)
        }
      },
    }),
  },
})
