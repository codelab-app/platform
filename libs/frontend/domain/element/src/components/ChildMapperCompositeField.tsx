import type { IPropData } from '@codelab/frontend/abstract/core'
import { SelectComponent } from '@codelab/frontend/domain/type'
import {
  AutoCompleteField,
  ToggleExpressionField,
} from '@codelab/frontend/presentation/view'
import type { IEntity } from '@codelab/shared/abstract/types'
import { useField } from 'uniforms'

const ChildMapperFields = ({ propsData }: { propsData: IPropData }) => {
  const [fieldProps] = useField<{ value?: IEntity }>('childMapperComponent', {})

  const PropKeyField = ToggleExpressionField({
    getBaseControl: () => (
      <AutoCompleteField
        filterOption
        label={null}
        name="childMapperPropKey"
        options={Object.keys(propsData)
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
          fieldProps.onChange((value ? { id: value } : null) as IEntity)
        }
      />
    </section>
  )
}

export default ChildMapperFields
