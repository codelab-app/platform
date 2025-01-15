import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { SelectOption } from '@codelab/frontend/abstract/types'

import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend-presentation-components-form'
import { useField } from 'uniforms'

import { SelectLinkElement } from '../SelectLinkElement'
import { ChildMapperComponentField } from './ChildMapperComponentField'

interface ChildMapperFieldsProps {
  runtimeElement: IRuntimeElementModel
}

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

const ChildMapperFields = ({ runtimeElement }: ChildMapperFieldsProps) => {
  const element = runtimeElement.element.current

  const [childMapperPreviousSiblingFieldProps] = useField<{
    value?: SelectOption
  }>('childMapperPreviousSibling', {})

  return (
    <section>
      <PropKeyField
        name="childMapperPropKey"
        options={Object.keys(runtimeElement.runtimeProps.runtimeContext)
          .sort()
          .map((label) => ({ label, value: label }))}
      />

      <ChildMapperComponentField />
      <SelectLinkElement
        elementOptions={element.children.map(mapElementOption)}
        name="childMapperPreviousSibling.id"
        onChange={(value) => {
          return childMapperPreviousSiblingFieldProps.onChange(
            value ? { id: value, label: value.name, value } : undefined,
          )
        }}
        targetElementId={element.id}
      />
    </section>
  )
}

export default ChildMapperFields
