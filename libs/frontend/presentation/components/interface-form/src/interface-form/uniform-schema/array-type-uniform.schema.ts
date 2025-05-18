import type { IArrayTypeModel } from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'

export const arrayTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IArrayTypeModel
> = (type, autocomplete) => {
  return {
    uniforms: {
      component: ToggleExpressionField({
        autocomplete,
        onToggle: (showExpression, { onChange, value }, lastValue) => {
          if (showExpression) {
            onChange(lastValue ?? `{{${JSON.stringify(value ?? [])}}}`)
          } else {
            onChange(lastValue ?? [])
          }
        },
      }),
    },
    errorMessage: `Must be of type Array<${type.itemType?.current.name}>, or an expression that evaluates to Array<${type.itemType?.current.name}>`,
  }
}
