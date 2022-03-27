import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectAppProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectApp = ({ name, error }: SelectAppProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-app', () =>
    interfaceFormApi.InterfaceForm_GetApps(),
  )

  const appOptions =
    data?.apps.map((app) => ({
      label: app.name,
      value: app.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={appOptions}
      showSearch
    />
  )
}
