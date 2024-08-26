import type { TransformContext } from '@codelab/frontend/abstract/domain'
import { createAutoCompleteOptions } from '@codelab/frontend-presentation-components-codemirror'
import { ToggleExpressionField } from '@codelab/frontend-presentation-components-form'
import { SelectComponent } from '../fields'

const ACTION_TEMPLATE = `{{
  function run() {
    const { AntDesignTypographyParagraph, /* import atoms here */ } = this.atoms

    return (
      <AntDesignTypographyParagraph>Hello world!</AntDesignTypographyParagraph>
    )
  }.bind(this)
}}`

export const selectComponentUiProperties = (context: TransformContext) => ({
  uniforms: {
    component: ToggleExpressionField({
      autocomplete: context.autocomplete
        ? createAutoCompleteOptions(context.autocomplete)
        : undefined,
      getBaseControl: (fieldProps) =>
        SelectComponent({ ...fieldProps, label: null, name: '' }),
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
