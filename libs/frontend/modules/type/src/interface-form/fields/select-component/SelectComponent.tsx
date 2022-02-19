import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'
// import { useGetComponentsForSelectQuery } from '../../../store'

export type SelectComponentProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectComponent = ({ name }: SelectComponentProps) => {
  /*   const { data: components, isLoading } = useGetComponentsForSelectQuery()

  const componentOptions =
    components?.getComponents.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []
 */
  return (
    <SelectField
      //      loading={isLoading}
      name={name}
      optionFilterProp="label"
      //      options={componentOptions}
      showSearch={true}
    />
  )
}
