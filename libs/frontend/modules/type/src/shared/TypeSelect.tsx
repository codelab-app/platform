import React from 'react'
import { SelectField } from 'uniforms-antd'
import { GetTypesQuery } from '../graphql/type.endpoints.graphql.gen'
import { useGetTypesQuery } from '../store'

export type CreateTypeSelectOptions = (
  getTypesResult?: GetTypesQuery,
) => Array<{ label: string; value: string }>

export type TypeSelectProps = {
  name: string
  label: string
  createTypeOptions?: CreateTypeSelectOptions
}

const defaultCreateTypeOptions: CreateTypeSelectOptions = (getTypesResult) =>
  getTypesResult?.getTypes?.map((i) => ({
    label: i.name,
    value: i.id,
  })) || []

export const TypeSelect = ({
  name,
  label,
  createTypeOptions,
}: TypeSelectProps) => {
  const { data: types } = useGetTypesQuery()

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
