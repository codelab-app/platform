import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { SelectComponent } from '@codelab/frontend/application/type'
import { mapElementOption } from '@codelab/frontend/domain/element'
import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import type { IRef } from '@codelab/shared/abstract/core'
import React from 'react'
import { useField } from 'uniforms'
import { SelectLinkElement } from './SelectLinkElement'

interface ChildMapperFieldsProps {
  runtimeElement: IRuntimeElementModel
}

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

  const PropKeyField = ToggleExpressionField({
    getBaseControl: () => (
      <AutoCompleteField
        filterOption
        label={null}
        name="childMapperPropKey"
        options={Object.keys(
          runtimeElement.runtimeProps.expressionEvaluationContext,
        )
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
