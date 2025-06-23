import type { IRuntimeElementModel } from '@codelab/frontend-abstract-application'
import type { GuaranteedProps } from 'uniforms'

import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend-presentation-components-form'
import { connectField } from 'uniforms'

const PropKeyField = ToggleExpressionField({
  getBaseControl: ({ options }) => (
    <AutoCompleteField
      filterOption
      label={null}
      name="childMapperPropKey"
      options={options}
    />
  ),
  onToggle: (showExpression, { field, onChange, value }, lastValue) => {
    if (showExpression) {
      onChange(lastValue ?? `{{'${value ?? field.default ?? ''}'}}`)
    } else {
      onChange(lastValue ?? field.default)
    }
  },
})

type ChildMapperPropKeyFieldProps = GuaranteedProps<unknown> & {
  runtimeElement: IRuntimeElementModel
}

export const ChildMapperPropKeyField =
  connectField<ChildMapperPropKeyFieldProps>(
    ({ name, runtimeElement }) => {
      return (
        <PropKeyField
          name={name}
          options={Object.keys(runtimeElement.runtimeProps.runtimeContext)
            .sort()
            .map((label) => ({ label, value: label }))}
        />
      )
    },
    { kind: 'leaf' },
  )
