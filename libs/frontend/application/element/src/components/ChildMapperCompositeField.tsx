import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { SelectComponent } from '@codelab/frontend/application/type'
import { mapElementOption } from '@codelab/frontend/domain/element'
import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import type { IEntity } from '@codelab/shared/abstract/types'
import React from 'react'
import { useField } from 'uniforms'
import { SelectLinkElement } from './SelectLinkElement'

interface ChildMapperFieldsProps {
  element: IElementModel
}

const ChildMapperFields = ({ element }: ChildMapperFieldsProps) => {
  const [childMapperComponentFieldProps] = useField<{ value?: IEntity }>(
    'childMapperComponent',
    {},
  )

  const [childMapperPreviousSiblingFieldProps] = useField<{ value?: IEntity }>(
    'childMapperPreviousSibling',
    {},
  )

  const PropKeyField = ToggleExpressionField({
    getBaseControl: () => (
      <AutoCompleteField
        filterOption
        label={null}
        name="childMapperPropKey"
        options={Object.keys(element.expressionEvaluationContext)
          .sort()
          .map((label) => ({ label, value: label }))}
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

  return (
    <section>
      <PropKeyField name="childMapperPropKey" />
      <SelectComponent
        label="Component"
        name="childMapperComponent.id"
        onChange={(value) =>
          childMapperComponentFieldProps.onChange(
            (value ? { id: value } : null) as IEntity,
          )
        }
      />
      <SelectLinkElement
        allElementOptions={element.children.map(mapElementOption)}
        name="childMapperPreviousSibling.id"
        onChange={(value) => {
          return childMapperPreviousSiblingFieldProps.onChange(
            (value ? { id: value } : null) as IEntity,
          )
        }}
        targetElementId={element.id}
      />
    </section>
  )
}

export default ChildMapperFields
