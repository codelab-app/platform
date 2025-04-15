import type {
  IReactNodeTypeModel,
  IRenderPropTypeModel,
} from '@codelab/frontend-abstract-domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend-abstract-types'

import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'

import { SelectComponent } from '../fields'

const COMPONENT_TEMPLATE = `{{
  function render() {
    const { AntDesignTypographyText } = this.atoms

    return (
      <AntDesignTypographyText>Content</AntDesignTypographyText>
    )
  }.bind(this)
}}`

export const selectComponentUniformSchema: ITypeModelUniformSchemaBuilder<
  IReactNodeTypeModel | IRenderPropTypeModel
> = (type, autocomplete) => ({
  uniforms: {
    component: ToggleExpressionField({
      autocomplete,
      getBaseControl: ({ value, ...fieldProps }) =>
        SelectComponent({
          ...fieldProps,
          label: null,
          name: '',
          value: value?.toString(),
        }) as React.ReactNode,
      onToggle: (showExpression, { field, onChange }, lastValue) => {
        if (showExpression) {
          onChange(lastValue ?? COMPONENT_TEMPLATE)
        } else {
          onChange(lastValue ?? field.default)
        }
      },
    }),
  },
})
