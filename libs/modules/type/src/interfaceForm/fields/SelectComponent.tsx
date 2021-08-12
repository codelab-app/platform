import { useGetComponentsQuery } from '@codelab/codegen/graphql'
import React from 'react'
import { HTMLFieldProps } from 'uniforms'
import { SelectField, SelectFieldProps } from 'uniforms-antd'

export type SelectComponentProps = HTMLFieldProps<string, SelectFieldProps>

export const SelectComponent = ({ name }: SelectComponentProps) => {
  const { data: components, loading } = useGetComponentsQuery()

  const componentOptions =
    components?.getComponents.map((component) => ({
      label: component.name,
      value: component.id,
    })) ?? []

  return (
    <SelectField
      options={componentOptions}
      name={name}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      loading={loading}
      showSearch={true}
      optionFilterProp="label"
    />
  )
}
