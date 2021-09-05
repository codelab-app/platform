import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
import { useGetComponentsForSelectQuery } from './GetComponentsForSelect.api.graphql.gen'

export type SelectComponentProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectComponent = ({ name }: SelectComponentProps) => {
  const { data: components, loading } = useGetComponentsForSelectQuery()

  const componentOptions =
    components?.getComponents.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return (
    <SelectField
      options={componentOptions}
      name={name}
      loading={loading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}
