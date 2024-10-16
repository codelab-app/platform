import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { SelectComponent } from '@codelab/frontend/presentation/components/interface-form'
import { mapElementOption } from '@codelab/frontend-domain-element/use-cases/element-options'
import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend-presentation-components-form'
import { useField } from 'uniforms'

import { SelectLinkElement } from './SelectLinkElement'

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

  const [childMapperComponentFieldProps] = useField<{ value?: IRef }>(
    'childMapperComponent',
    {},
  )

  const [childMapperPreviousSiblingFieldProps] = useField<{ value?: IRef }>(
    'childMapperPreviousSibling',
    {},
  )

  return (
    <section>
      <PropKeyField
        name="childMapperPropKey"
        options={Object.keys(runtimeElement.runtimeProps.runtimeContext)
          .sort()
          .map((label) => ({ label, value: label }))}
      />
      <SelectComponent
        label="Component"
        name="childMapperComponent.id"
        onChange={(value) =>
          childMapperComponentFieldProps.onChange(
            (value ? { id: value } : null) as IRef,
          )
        }
      />
      <SelectLinkElement
        allElementOptions={element.children.map(mapElementOption)}
        name="childMapperPreviousSibling.id"
        onChange={(value) => {
          return childMapperPreviousSiblingFieldProps.onChange(
            (value ? { id: value } : null) as IRef,
          )
        }}
        targetElementId={element.id}
      />
    </section>
  )
}

export default ChildMapperFields
