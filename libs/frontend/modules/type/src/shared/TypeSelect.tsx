import React from 'react'
import { SelectField } from 'uniforms-antd'
import { GetTypesQuery } from '../graphql/type.endpoints.graphql.gen'
import { useGetTypesQuery } from '../store/typeEndpoints'

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

export const TypeSelect = (props: TypeSelectProps) => {
  const { data: types } = useGetTypesQuery()
  const { createTypeOptions, ...rest } = props

  const typeOptions = createTypeOptions
    ? createTypeOptions(types)
    : defaultCreateTypeOptions(types)

  return (
    <SelectField
      options={typeOptions}
      showSearch={true}
      optionFilterProp="label"
      {...rest}
    />
  )
}
