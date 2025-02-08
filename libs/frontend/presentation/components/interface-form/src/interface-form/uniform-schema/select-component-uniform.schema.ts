import type {
  IReactNodeTypeModel,
  IRenderPropTypeModel,
} from '@codelab/frontend/abstract/domain'
import type { ITypeModelUniformSchemaBuilder } from '@codelab/frontend/abstract/types'

import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'

import { SelectComponent } from '../fields'

const COMPONENT_TEMPLATE = `{{
  function run() {
    const { AntDesignTypographyParagraph, /* import atoms here */ } = this.atoms

    return (
      <AntDesignTypographyParagraph>Hello world!</AntDesignTypographyParagraph>
    )
  }.bind(this)
}}`

export const selectComponentUniformSchema: ITypeModelUniformSchemaBuilder<
  IReactNodeTypeModel | IRenderPropTypeModel
> = (type, autocomplete) => ({
  uniforms: {
    component: ToggleExpressionField({
      autocomplete,
      getBaseControl: async ({ value, ...fieldProps }) =>
        SelectComponent({
          ...fieldProps,
          label: null,
          name: 'id',
          value: value?.toString(),
        }),
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
