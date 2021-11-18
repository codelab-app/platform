import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetComponentsForSelectQuery } from '../../../store/typeEndpoints'

export type SelectComponentProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectComponent = ({ name }: SelectComponentProps) => {
  const { data: components, isLoading } = useGetComponentsForSelectQuery()

  const componentOptions =
    components?.getComponents.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return (
    <SelectField
      options={componentOptions}
      name={name}
      loading={isLoading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}
