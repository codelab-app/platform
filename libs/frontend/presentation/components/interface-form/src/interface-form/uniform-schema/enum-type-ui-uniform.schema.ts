import type { IEnumTypeModel } from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'

export const enumTypeUniformSchema: ITypeModelUniformSchemaBuilder<
  IEnumTypeModel
> = (type, autocomplete) => {
  return {
    enum: type.allowedValues.map((allowedValue) => allowedValue.value),
    uniforms: {
      component: ToggleExpressionField({
        autocomplete,
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
