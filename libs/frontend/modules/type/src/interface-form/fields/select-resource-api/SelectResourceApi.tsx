import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectResourcesApiProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectResourcesApi = ({
  name,
  error,
}: SelectResourcesApiProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-resource-api', () =>
    interfaceFormApi.InterfaceForm_GetResourceApi({
      where: { apiOfResource: true },
    }),
  )

  const options =
    data?.interfaceTypes.map((store) => ({
      label: store.name.replace('Resource API', ''),
      value: store.id,
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
