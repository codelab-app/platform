import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SelectOption } from '@codelab/frontend/abstract/types'

import { SelectComponent } from '@codelab/frontend/presentation/components/interface-form'
import { useField } from 'uniforms'

export const ChildMapperComponentField = () => {
  const [childMapperComponentFieldProps] = useField<{ value?: SelectOption }>(
    'childMapperComponent',
    {},
  )

  return (
    <SelectComponent
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...childMapperComponentFieldProps}
      label="Component"
      name="childMapperComponent.id"
      onChange={(value) => {
        console.log('select component on change', value)

        return childMapperComponentFieldProps.onChange(
          value ? { id: value, label: value.name, value } : undefined,
        )
      }}
    />
  )
}
