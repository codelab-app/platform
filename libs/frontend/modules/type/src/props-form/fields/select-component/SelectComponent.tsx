import { Select } from 'antd'
import React from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { useQuery } from 'react-query'
import { interfaceFormApi } from '../../../store'

export type SelectComponentProps = ControllerRenderProps<FieldValues, string>

/**
 * @returns { data, isLoading, error }
 */
export const useGetAllComponents = () => {
  const { data, isLoading, error } = useQuery(
    'interface-form/select-component',
    () =>
      interfaceFormApi.InterfaceForm_GetComponents({
        where: { name_NOT_CONTAINS: 'Hook' },
      }),
  )

  const componentOptions =
    data?.components.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return {
    data,
    componentOptions,
    isLoading,
    error,
  }
}

export const SelectComponent = ({
  name,
  onBlur,
  onChange,
  value,
}: SelectComponentProps) => {
  const { componentOptions, isLoading } = useGetAllComponents()

  return (
    <Select
      loading={isLoading}
      onBlur={onBlur}
      onChange={onChange}
      optionFilterProp="label"
      options={componentOptions}
      showSearch
      value={value}
    />
  )
}
