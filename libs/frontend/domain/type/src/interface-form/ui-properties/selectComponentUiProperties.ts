import { ToggleExpressionField } from '@codelab/frontend/view/components'
import { SelectComponent } from '../fields'
import { UiPropertiesFn } from '../types'

const ACTION_TEMPLATE = `{{
  function run() {
    const { AntDesignTypographyParagraph, /* import atoms here */ } = this.atoms

    return (
      <AntDesignTypographyParagraph>Hello world!</AntDesignTypographyParagraph>
    )
  }.bind(this)
}}`

export const selectComponentUiProperties: UiPropertiesFn = () => ({
  oneOf: [{ typeof: 'string' }, { typeof: 'function' }],
  uniforms: {
    component: ToggleExpressionField({
      getBaseControl: () => SelectComponent({ label: null, name: 'value' }),
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
