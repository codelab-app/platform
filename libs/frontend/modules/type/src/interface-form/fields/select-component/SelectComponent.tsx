import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectComponentProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectComponent = ({ name, error }: SelectComponentProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-component', () =>
    interfaceFormApi.InterfaceForm_GetComponents(),
  )

  const componentOptions =
    data?.components.map((component) => ({
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
