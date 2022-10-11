import { UniformSelectFieldProps } from '@codelab/shared/abstract/types'
import React from 'react'
import { useQuery } from 'react-query'
import { SelectField } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectComponentProps = UniformSelectFieldProps & {
  activeComponentId: string
}

export const SelectComponent = ({
  name,
  error,
  activeComponentId,
}: SelectComponentProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-component', () =>
    interfaceFormApi.InterfaceForm_GetComponents(),
  )

  // remove the components that refer the current component to avoid creating circular references
  // including itself
  const filteredComponents = data?.components.filter(
    (component) =>
      component.descendantComponentIds.indexOf(activeComponentId) === -1,
  )

  const componentOptions =
    filteredComponents?.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
    />
  )
}
