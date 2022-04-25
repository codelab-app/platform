import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectResourcesApiProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectResources = ({ name, error }: SelectResourcesApiProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-resource', () =>
    interfaceFormApi.InterfaceForm_GetResource(),
  )

  const options =
    data?.resources.map((resource) => ({
      label: resource.name,
      value: resource.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={options}
      showSearch={true}
    />
  )
}
