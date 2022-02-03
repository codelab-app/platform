import React from 'react'
import { SelectField } from 'uniforms-antd'
import { BaseTypeResponse, useGetAllTypesQuery } from '../hooks/useGetAllTypes'

export type CreateTypeSelectOptions = (
  getTypesResult?: BaseTypeResponse,
) => Array<{ label: string; value: string }>

export type TypeSelectProps = {
  name: string
  label: string
  createTypeOptions?: CreateTypeSelectOptions
}

const defaultCreateTypeOptions: CreateTypeSelectOptions = (getTypesResult) =>
  getTypesResult?.types?.map((i: any) => ({
    label: i.name,
    value: i.id,
  })) || []

export const TypeSelect = ({
  name,
  label,
  createTypeOptions,
}: TypeSelectProps) => {
  const { data: types } = useGetAllTypesQuery()

  const typeOptions = createTypeOptions
    ? createTypeOptions(types)
    : defaultCreateTypeOptions(types)

  return (
    <SelectField
      label={label}
      name={name}
      optionFilterProp="label"
      options={typeOptions}
      showSearch={true}
    />
  )
}
