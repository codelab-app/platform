import React from 'react'
import { useQuery } from 'react-query'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { interfaceFormApi } from '../../../store'

export type SelectActionProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectAction = ({ name, error }: SelectActionProps) => {
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery('interface-form/select-action', () =>
    interfaceFormApi.InterfaceForm_GetActions(),
  )

  const actionOptions =
    data?.actions.map((action) => ({
      label: action.name,
      value: action.id,
    })) ?? []

  return (
    <SelectField
      error={error || queryError}
      loading={isLoading}
      name={name}
      optionFilterProp="label"
      options={actionOptions}
      showSearch
    />
  )
}
